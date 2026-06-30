/**
 * Pure cover-flow geometry — maps a card index + the continuous rotation value
 * to a transform on a horizontal billboard carousel. No React, no DOM.
 *
 * Layout (matches the reference: rotate left↔right along X):
 *   - the card whose index equals `rotation` sits dead CENTER, facing the
 *     viewer, and is MUCH larger than the rest,
 *   - the others fan out to the left and right (signed offset), shrinking,
 *     dimming, receding in depth and blurring the farther they are,
 *   - all cards stay billboarded (no Y-flip) so they always face the user.
 *
 * `rotation` is unbounded → the carousel spins infinitely both directions; the
 * signed offset wraps so a card leaving one side reappears on the other while
 * invisible at the back.
 */

export interface OrbitGeometryConfig {
  /** Half-width the side cards spread to, px. */
  spreadX: number;
  /** How far back the side cards recede, px. */
  depth: number;
  /** Scale/opacity falloff rate with distance from center (higher = sharper). */
  falloff: number;
  /** Horizontal spread compression (tanh rate). */
  compression: number;
  /** Scale of the farthest card. */
  minScale: number;
  /** Scale of the centered (focused) card. */
  maxScale: number;
  /** Opacity floor for the farthest card. */
  minOpacity: number;
  /** Max depth blur (px) on the farthest card. */
  maxBlur: number;
}

export interface PanelTransform {
  /** Signed distance from center, in card steps (0 = centered). */
  offset: number;
  x: number;
  y: number;
  z: number;
  /** 1 at center → 0 at the back. Drives scale/opacity/blur/z-index. */
  prominence: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

export const DEFAULT_GEOMETRY: OrbitGeometryConfig = {
  spreadX: 460,
  depth: 320,
  falloff: 1.0,
  compression: 0.52,
  minScale: 0.4,
  maxScale: 1,
  minOpacity: 0.05,
  maxBlur: 4,
};

/** Wrap a step offset to the nearest equivalent in [-count/2, count/2]. */
function wrapOffset(v: number, count: number): number {
  let d = (((v % count) + count) % count); // 0..count
  if (d > count / 2) d -= count; // -count/2..count/2
  return d;
}

/** Compute the transform for one card at the given continuous rotation. */
export function computePanel(
  index: number,
  count: number,
  rotation: number,
  cfg: OrbitGeometryConfig,
): PanelTransform {
  const d = wrapOffset(index - rotation, count);
  const ad = Math.abs(d);

  // focus: 1 at center, decaying exponentially with distance — this is what
  // makes the centered card dramatically larger than its neighbors.
  const focus = Math.exp(-ad * cfg.falloff);

  // tanh spread: near cards separate clearly; far cards saturate at the edge.
  const x = Math.tanh(d * cfg.compression) * cfg.spreadX;
  const y = 0;
  const z = -(1 - Math.exp(-ad * 0.7)) * cfg.depth;

  const scale = cfg.minScale + (cfg.maxScale - cfg.minScale) * focus;
  const opacity = cfg.minOpacity + (1 - cfg.minOpacity) * Math.pow(focus, 0.9);
  const blur = (1 - focus) * cfg.maxBlur;
  const zIndex = Math.round(focus * 1000);

  return { offset: d, x, y, z, prominence: focus, scale, opacity, blur, zIndex };
}

/** Which index is currently centered / focused. */
export function activeIndexOf(rotation: number, count: number): number {
  return ((Math.round(rotation) % count) + count) % count;
}

/**
 * Nearest rotation target that brings `index` to center, taking the shortest
 * path around the carousel from the current rotation.
 */
export function shortestTarget(rotation: number, index: number, count: number): number {
  const base = Math.round(rotation);
  const mod = (((index - base) % count) + count) % count; // 0..count-1
  const diff = mod > count / 2 ? mod - count : mod;
  return base + diff;
}
