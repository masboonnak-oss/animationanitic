/**
 * Pure orbit geometry — maps a panel index + the continuous rotation value to a
 * transform on a circular orbit. No React, no DOM.
 *
 * Layout (matches the "rotating circular navigation" reference):
 *   - panels are placed around a circle centered on a fixed pivot,
 *   - the panel whose index equals `rotation` sits at the TOP (phi = 0) and is
 *     the active/focused page,
 *   - the others fan around the ring; the farther from the top, the smaller,
 *     dimmer and more blurred (the bottom panel is the least prominent).
 *
 * A slight vertical foreshortening (radiusY < radiusX) plus a small forward
 * "pop" (translateZ) on the active panel gives premium 3D depth without a real
 * camera. `rotation` is unbounded, so the wheel spins infinitely both ways.
 */

export interface OrbitGeometryConfig {
  /** Horizontal orbit radius, px. */
  radiusX: number;
  /** Vertical orbit radius, px (smaller than radiusX for perspective). */
  radiusY: number;
  /** Forward translateZ applied to the active (top) panel, px. */
  popZ: number;
  /** Scale of the least-prominent (bottom) panel. */
  minScale: number;
  /** Scale of the active (top) panel. */
  maxScale: number;
  /** Opacity floor for the bottom panel. */
  minOpacity: number;
  /** Max depth blur (px) on the bottom panel. */
  maxBlur: number;
}

export interface PanelTransform {
  /** Angle on the orbit, radians. 0 = top/active. */
  phi: number;
  /** Horizontal offset from center, px. */
  x: number;
  /** Vertical offset from center, px (negative = up). */
  y: number;
  /** Forward depth, px. */
  z: number;
  /** 1 at top (active) → 0 at bottom. Drives scale/opacity/blur/z-index. */
  prominence: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

export const DEFAULT_GEOMETRY: OrbitGeometryConfig = {
  radiusX: 360,
  radiusY: 280,
  popZ: 120,
  minScale: 0.62,
  maxScale: 1,
  minOpacity: 0.16,
  maxBlur: 6,
};

/** Compute the transform for one panel at the given continuous rotation. */
export function computePanel(
  index: number,
  count: number,
  rotation: number,
  cfg: OrbitGeometryConfig,
): PanelTransform {
  const step = (Math.PI * 2) / count;
  const phi = (index - rotation) * step;
  const sin = Math.sin(phi);
  const cos = Math.cos(phi);

  // prominence: 1 at the top (phi = 0), 0 at the bottom (phi = ±π).
  const prominence = (cos + 1) / 2;

  const x = sin * cfg.radiusX;
  const y = -cos * cfg.radiusY; // phi = 0 → -radiusY (top)
  const z = prominence * cfg.popZ;

  const scale = cfg.minScale + (cfg.maxScale - cfg.minScale) * prominence;
  const opacity = cfg.minOpacity + (1 - cfg.minOpacity) * Math.pow(prominence, 1.3);
  const blur = (1 - prominence) * cfg.maxBlur;
  const zIndex = Math.round(prominence * 1000);

  return { phi, x, y, z, prominence, scale, opacity, blur, zIndex };
}

/** Which index is currently at the top / focused. */
export function activeIndexOf(rotation: number, count: number): number {
  return ((Math.round(rotation) % count) + count) % count;
}

/**
 * Nearest rotation target that brings `index` to the top, taking the shortest
 * path around the ring from the current rotation (so clicking a panel never
 * unwinds the long way around).
 */
export function shortestTarget(rotation: number, index: number, count: number): number {
  const base = Math.round(rotation);
  const mod = (((index - base) % count) + count) % count; // 0..count-1
  const diff = mod > count / 2 ? mod - count : mod;
  return base + diff;
}
