import { clamp } from './map';
export type vec2 = [number, number];

export const vector = (x: number, y: number): vec2 => [x, y];

export const add = (...v: vec2[]): vec2 =>
  v.reduce((prev, curr) => [curr[0] + prev[0], curr[1] + prev[1]]);
export const sub = (...v: vec2[]): vec2 =>
  v.reduce((prev, curr) => [curr[0] - prev[0], curr[1] - prev[1]]);
export const mult = (v: vec2, s: number): vec2 => [v[0] * s, v[1] * s];
export const div = (v: vec2, d: number): vec2 => [v[0] / d, v[1] / d];

export const dot = (v0: vec2, v1: vec2): number => v0[0] * v1[0] + v0[1] * v1[1];

export const length = (v: vec2) => Math.sqrt(v[0] ** 2 + v[1] ** 2);

export const unit = (v: vec2): vec2 => {
  const l = length(v);
  return [v[0] / l, v[1] / l];
};

export function rotate(vector: vec2, angle: number): vec2 {
  // Convert the normalized angle to radians (0 to 2π)
  const radians = angle * 2 * Math.PI;

  const [x, y] = vector;

  // Calculate the new coordinates using the rotation matrix
  const cosTheta = Math.cos(radians);
  const sinTheta = Math.sin(radians);

  const rotatedX = x * cosTheta - y * sinTheta;
  const rotatedY = x * sinTheta + y * cosTheta;

  return [rotatedX, rotatedY];
}

export const toPolar = (v: vec2): vec2 => {
  return [Math.atan2(v[1], v[0]), length(v)];
};

export const min = (v0: vec2, v1: vec2): vec2 => [Math.min(v0[0], v1[0]), Math.min(v0[1], v1[1])];
export const max = (v0: vec2, v1: vec2): vec2 => [Math.max(v0[0], v1[0]), Math.max(v0[1], v1[1])];

export const lerp = (v0: vec2, v1: vec2, fraction: number) => add(mult(sub(v1, v0), fraction), v0);

export const fromAngle = (angle: number, length: number): vec2 => [
  Math.cos(angle * Math.PI) * length,
  Math.sin(angle * Math.PI) * length,
];

export const clamp_vector = (v: vec2, min: vec2, max: vec2): vec2 => [
  clamp(v[0], min[0], max[0]),
  clamp(v[1], min[1], max[1]),
];
