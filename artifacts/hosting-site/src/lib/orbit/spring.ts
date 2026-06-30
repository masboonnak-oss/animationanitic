/**
 * Reusable, framerate-independent spring integrator.
 *
 * Pure math — no React, no DOM. This is the heart of the orbit animation
 * engine and is intentionally decoupled from any UI so it can be unit-tested
 * and reused anywhere. It advances a 1D value toward a target using a
 * semi-implicit Euler integration with fixed sub-steps for numerical
 * stability at any frame delta (so it stays smooth whether the display is
 * 60 Hz, 120 Hz, or a frame is dropped).
 */

export interface SpringConfig {
  /** Higher = snappier pull toward target. */
  stiffness: number;
  /** Higher = less oscillation. ~2*sqrt(stiffness*mass) is critically damped. */
  damping: number;
  /** Inertia. */
  mass: number;
}

export interface SpringState {
  value: number;
  velocity: number;
}

/** Tuned for a premium, near-critically-damped "VisionOS" settle (no wobble). */
export const PREMIUM_SPRING: SpringConfig = { stiffness: 180, damping: 26, mass: 1 };

/** Under-damped: overshoots then settles — the "paper pop-up" bounce. */
export const POP_SPRING: SpringConfig = { stiffness: 260, damping: 13, mass: 1 };

/** Fixed integration sub-step (240 Hz) — keeps the spring identical across refresh rates. */
const SUBSTEP = 1 / 240;

/**
 * Advance the spring by `dt` seconds toward `target`.
 * Returns the next immutable state; does not mutate the input.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  cfg: SpringConfig,
  dt: number,
): SpringState {
  const steps = Math.max(1, Math.ceil(dt / SUBSTEP));
  const h = dt / steps;
  let { value, velocity } = state;

  for (let i = 0; i < steps; i++) {
    const force = -cfg.stiffness * (value - target) - cfg.damping * velocity;
    const accel = force / cfg.mass;
    velocity += accel * h;
    value += velocity * h;
  }

  return { value, velocity };
}

/** True once the spring is effectively at rest at the target. */
export function isSettled(state: SpringState, target: number, eps = 0.0006): boolean {
  return Math.abs(state.value - target) < eps && Math.abs(state.velocity) < eps;
}
