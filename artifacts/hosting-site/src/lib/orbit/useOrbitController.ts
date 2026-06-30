import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  activeIndexOf,
  computePanel,
  DEFAULT_GEOMETRY,
  OrbitGeometryConfig,
  shortestTarget,
} from "./geometry";
import { isSettled, POP_SPRING, PREMIUM_SPRING, SpringConfig, stepSpring } from "./spring";

/**
 * Orbit animation controller — the bridge between the pure engine
 * (spring + geometry) and the DOM.
 *
 * Design notes for 60 fps with no flicker:
 *   - Rotation lives in refs and is advanced inside a single rAF loop.
 *   - Per-frame styling is written DIRECTLY to panel elements (transform /
 *     opacity / filter / z-index) — React never re-renders during motion, so
 *     there is no reconciliation cost and no layout reflow (transform/opacity
 *     are composited on the GPU).
 *   - React state changes only when the focused index actually changes
 *     (for ARIA + focus styling), at most once per settle.
 */

export interface OrbitControllerOptions {
  count: number;
  geometry?: Partial<OrbitGeometryConfig>;
  spring?: SpringConfig;
  reducedMotion?: boolean;
  /** Navigate to a page (called on activate / Enter / click-when-focused). */
  onActivate?: (index: number) => void;
  /** Fires when the focused index changes. */
  onActiveChange?: (index: number) => void;
  /** Per-frame hook (rotation, velocity) — e.g. to drive a Framer MotionValue. */
  onFrame?: (rotation: number, velocity: number) => void;
  /** Idle auto-rotation speed in steps/second (0 = off). Pauses on interaction. */
  idleSpin?: number;
  /** Idle delay before auto-rotation resumes, ms. */
  idleDelay?: number;
}

export interface StageProps {
  tabIndex: number;
  role: string;
  "aria-label": string;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function useOrbitController(opts: OrbitControllerOptions) {
  const {
    count,
    geometry,
    spring = PREMIUM_SPRING,
    reducedMotion = false,
    onActivate,
    onActiveChange,
    onFrame,
  } = opts;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const panels = useRef<Map<number, HTMLElement>>(new Map());
  const refCbCache = useRef<Map<number, (el: HTMLElement | null) => void>>(new Map());

  const geo = useRef<OrbitGeometryConfig>({ ...DEFAULT_GEOMETRY, ...geometry });
  const rotation = useRef(0);
  const velocity = useRef(0);
  const target = useRef(0);

  const pointerDown = useRef(false);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const dragStep = useRef(120);

  const wheelAccum = useRef(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);
  const intro = useRef(0); // 0 → 1 entrance progress (GSAP-driven)
  const lastInteract = useRef(0);
  const pop = useRef({ value: 1, velocity: 0 }); // paper "pop-up" spring for the active panel
  const idleSpinRef = useRef(opts.idleSpin ?? 0);
  const idleDelayRef = useRef(opts.idleDelay ?? 2600);
  idleSpinRef.current = opts.idleSpin ?? 0;
  idleDelayRef.current = opts.idleDelay ?? 2600;

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Keep latest callbacks without re-binding listeners.
  const onActivateRef = useRef(onActivate);
  const onActiveChangeRef = useRef(onActiveChange);
  const onFrameRef = useRef(onFrame);
  const reducedRef = useRef(reducedMotion);
  const countRef = useRef(count);
  const springRef = useRef(spring);
  onActivateRef.current = onActivate;
  onActiveChangeRef.current = onActiveChange;
  onFrameRef.current = onFrame;
  reducedRef.current = reducedMotion;
  countRef.current = count;
  springRef.current = spring;

  // ── Per-frame DOM write (the only place that touches panel styles) ────────
  const applyFrame = useCallback(() => {
    const c = countRef.current;
    if (!c) return;
    const cfg = geo.current;
    const introP = intro.current;
    const speed = Math.abs(velocity.current);
    // Motion blur scales with angular velocity (frozen while dragging for clarity).
    const motionBlur = dragging.current ? 0 : Math.min(cfg.maxBlur * 1.6, speed * 1.1);

    const popV = pop.current.value;
    const activeI = activeRef.current;

    panels.current.forEach((el, i) => {
      const p = computePanel(i, c, rotation.current, cfg);

      // Entrance: panels fly in from far depth and fade up.
      const introZ = (1 - introP) * -700;
      const introScale = 0.6 + 0.4 * introP;
      const opacity = p.opacity * introP;
      const blur = p.blur + motionBlur;

      // Paper "pop-up": the active (top) panel lifts toward the viewer with a
      // springy overshoot, like a card popping off the surface.
      const isActive = i === activeI;
      const popZ = isActive ? popV * 90 : 0;
      const popLift = isActive ? popV * 12 : 0;
      const popScale = isActive ? 1 + popV * 0.05 : 1;

      el.style.transform =
        `translate3d(calc(-50% + ${p.x.toFixed(2)}px), calc(-50% + ${(p.y - popLift).toFixed(2)}px), ${(p.z + introZ + popZ).toFixed(2)}px) ` +
        `scale(${(p.scale * introScale * popScale).toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = String(p.zIndex + (isActive ? 1 : 0));
      el.style.filter = blur > 0.08 ? `blur(${blur.toFixed(2)}px)` : "";
      el.style.pointerEvents = p.prominence > 0.55 ? "auto" : "none";
    });

    onFrameRef.current?.(rotation.current, velocity.current);
  }, []);

  const markInteraction = useCallback((now?: number) => {
    lastInteract.current = now ?? (typeof performance !== "undefined" ? performance.now() : 0);
  }, []);

  const syncActive = useCallback(() => {
    const a = activeIndexOf(rotation.current, countRef.current);
    if (a !== activeRef.current) {
      activeRef.current = a;
      // Re-arm the paper pop-up bounce for the panel that just reached the top.
      if (!reducedRef.current) pop.current = { value: 0, velocity: 0 };
      setActive(a);
      onActiveChangeRef.current?.(a);
    }
  }, []);

  // ── rAF loop ──────────────────────────────────────────────────────────────
  const tick = useCallback(
    (now: number) => {
      if (!last.current) last.current = now;
      const dt = Math.min(0.05, (now - last.current) / 1000);
      last.current = now;

      // Idle auto-rotation: gently advances the target after a period of no
      // interaction, for a "showroom" drift. Disabled under reduced motion.
      const idleActive =
        idleSpinRef.current > 0 &&
        !reducedRef.current &&
        !dragging.current &&
        intro.current >= 1 &&
        now - lastInteract.current > idleDelayRef.current;
      if (idleActive) {
        target.current += idleSpinRef.current * dt;
      }

      if (!dragging.current) {
        const s = stepSpring(
          { value: rotation.current, velocity: velocity.current },
          target.current,
          springRef.current,
          dt,
        );
        rotation.current = s.value;
        velocity.current = s.velocity;
      }

      // Advance the paper pop-up bounce toward its resting (popped) state.
      if (reducedRef.current) pop.current = { value: 1, velocity: 0 };
      else pop.current = stepSpring(pop.current, 1, POP_SPRING, dt);

      syncActive();
      applyFrame();

      // In idle-spin mode the loop never fully rests (it waits to drift), but
      // it stays cheap while idle (spring already at target). Otherwise it
      // stops on settle to save battery.
      const idleMode = idleSpinRef.current > 0 && !reducedRef.current;
      const restful =
        !idleMode &&
        !dragging.current &&
        isSettled({ value: rotation.current, velocity: velocity.current }, target.current) &&
        (reducedRef.current || isSettled(pop.current, 1, 0.002)) &&
        intro.current >= 1;

      if (restful) {
        rotation.current = target.current;
        velocity.current = 0;
        applyFrame();
        syncActive();
        raf.current = null;
        last.current = 0;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    },
    [applyFrame, syncActive],
  );

  const ensureRunning = useCallback(() => {
    if (raf.current == null) {
      last.current = 0;
      raf.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  // ── Public movement API ─────────────────────────────────────────────────
  const goTo = useCallback(
    (t: number) => {
      markInteraction();
      target.current = t;
      if (reducedRef.current) {
        rotation.current = t;
        velocity.current = 0;
        intro.current = 1;
        applyFrame();
        syncActive();
        return;
      }
      ensureRunning();
    },
    [applyFrame, ensureRunning, syncActive],
  );

  const next = useCallback(() => goTo(Math.round(target.current) + 1), [goTo]);
  const prev = useCallback(() => goTo(Math.round(target.current) - 1), [goTo]);
  const focus = useCallback(
    (i: number) => goTo(shortestTarget(rotation.current, i, countRef.current)),
    [goTo],
  );
  const activate = useCallback((i?: number) => {
    onActivateRef.current?.(i ?? activeRef.current);
  }, []);
  const handlePanelClick = useCallback(
    (i: number) => {
      if (activeRef.current === i) activate(i);
      else focus(i);
    },
    [activate, focus],
  );

  // ── Responsive radius ─────────────────────────────────────────────────────
  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    geo.current = {
      ...geo.current,
      radiusX: Math.max(150, Math.min(w * 0.3, 440)),
      radiusY: Math.max(110, Math.min(h * 0.26, 300)),
    };
    dragStep.current = Math.max(60, Math.min(w * 0.12, 180));
    applyFrame();
  }, [applyFrame]);

  // ── Pointer (mouse + touch unified) ───────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      markInteraction();
      pointerDown.current = true;
      dragging.current = false;
      dragStartX.current = e.clientX;
      dragStartRotation.current = rotation.current;
    },
    [markInteraction],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerDown.current) return;
      markInteraction();
      const dx = e.clientX - dragStartX.current;
      if (!dragging.current) {
        if (Math.abs(dx) < 6) return;
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        ensureRunning();
      }
      rotation.current = dragStartRotation.current - dx / dragStep.current;
      target.current = rotation.current;
    },
    [ensureRunning],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      pointerDown.current = false;
      if (!dragging.current) return;
      dragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      goTo(Math.round(rotation.current));
    },
    [goTo],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      markInteraction();
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
        case "d":
        case "D":
        case "w":
        case "W":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowDown":
        case "a":
        case "A":
        case "s":
        case "S":
          e.preventDefault();
          prev();
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          activate();
          break;
        case "Home":
          e.preventDefault();
          focus(0);
          break;
      }
    },
    [next, prev, activate, focus],
  );

  const getStageProps = useCallback(
    (label: string): StageProps => ({
      tabIndex: 0,
      role: "listbox",
      "aria-label": label,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onKeyDown,
    }),
    [onPointerDown, onPointerMove, endDrag, onKeyDown],
  );

  const getPanelRef = useCallback((i: number) => {
    let cb = refCbCache.current.get(i);
    if (!cb) {
      cb = (el: HTMLElement | null) => {
        if (el) panels.current.set(i, el);
        else panels.current.delete(i);
      };
      refCbCache.current.set(i, cb);
    }
    return cb;
  }, []);

  // ── Initial paint (no flash) + entrance + listeners ───────────────────────
  useLayoutEffect(() => {
    recalc();
    intro.current = reducedRef.current ? 1 : 0;
    applyFrame();
  }, [recalc, applyFrame]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // GSAP-driven entrance (premium ease) — animates the intro progress that
    // applyFrame reads, then the rAF loop carries the spring settle.
    let introTween: gsap.core.Tween | null = null;
    if (!reducedRef.current) {
      const proxy = { p: 0 };
      introTween = gsap.to(proxy, {
        p: 1,
        duration: 1.1,
        ease: "power3.out",
        onUpdate: () => {
          intro.current = proxy.p;
        },
      });
      ensureRunning();
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      markInteraction();
      wheelAccum.current += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const threshold = 42;
      let guard = 0;
      while (Math.abs(wheelAccum.current) >= threshold && guard < 4) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current -= dir * threshold;
        goTo(Math.round(target.current) + dir);
        guard++;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(() => recalc());
    ro.observe(el);

    // Start the idle-drift clock after load, and keep the loop alive in idle mode.
    markInteraction();
    if (idleSpinRef.current > 0 && !reducedRef.current) ensureRunning();

    // Pause everything when the tab is hidden; resume (and re-arm idle) on return.
    const onVisibility = () => {
      if (document.hidden) {
        if (raf.current != null) cancelAnimationFrame(raf.current);
        raf.current = null;
      } else {
        markInteraction();
        ensureRunning();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      introTween?.kill();
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [ensureRunning, goTo, markInteraction, recalc]);

  return {
    containerRef,
    getStageProps,
    getPanelRef,
    handlePanelClick,
    active,
    next,
    prev,
    focus,
    activate,
  };
}
