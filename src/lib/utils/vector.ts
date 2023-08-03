export type vec2 = [number, number];

export const add = (...v: vec2[]): vec2 =>
  v.reduce((prev, curr) => [curr[0] + prev[0], curr[1] + prev[1]]);
export const sub = (...v: vec2[]): vec2 =>
  v.reduce((prev, curr) => [curr[0] - prev[0], curr[1] - prev[1]]);
export const mult = (v: vec2, s: number): vec2 => [v[0] * s, v[1] * s];
export const div = (v: vec2, d: number): vec2 => [v[0] / d, v[1] / d];

export const dot = (v0: vec2, v1: vec2): number =>
  v0[0] * v1[0] + v0[1] * v1[1];

export const length = (v: vec2) => Math.sqrt(v[0] ** 2 + v[1] ** 2);

export const unit = (v: vec2): vec2 => {
  const l = length(v);
  return [v[0] / l, v[1] / l];
};

export const rotate = (v: vec2, a: number): vec2 => {
  return [
    v[0] * Math.cos(Math.PI * a) - v[1] * -Math.sin(Math.PI * a),
    v[0] * Math.sin(Math.PI * a) + v[1] * Math.cos(Math.PI * a),
  ];
};

export const toPolar = (v: vec2): vec2 => {
  return [Math.atan2(v[1], v[0]), length(v)];
};

export const min = (v0: vec2, v1: vec2): vec2 => [
  Math.min(v0[0], v1[0]),
  Math.min(v0[1], v1[1]),
];
export const max = (v0: vec2, v1: vec2): vec2 => [
  Math.max(v0[0], v1[0]),
  Math.max(v0[1], v1[1]),
];

export const lerp = (v0: vec2, v1: vec2, fraction: number) =>
  add(mult(sub(v1, v0), fraction), v0);

export const fromAngle = (angle: number, length: number): vec2 => [
  Math.cos(angle * Math.PI) * length,
  Math.sin(angle * Math.PI) * length,
];
