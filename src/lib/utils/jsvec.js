/**
 * @typedef {[number,number]} vec2
 */

/**
 * @typedef {[number,number,number]} vec3
 */

/**
 * @param {number} x
 * @param {number} y
 * @returns {vec2}
 */
const vec2 = (x, y) => [x, y];

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {vec3}
 */
const vec3 = (x, y, z) => [x, y, z];

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V | number} v1
 * @returns {V}
 */
const add = (v0, v1) => v0.map((value, i) => value + (v1?.[i] || v1));

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V | number} v1
 * @returns {V}
 */
const sub = (v0, v1) => v0.map((value, i) => value - (v1?.[i] || v1));

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V | number} v1
 * @returns {V}
 */
const mult = (v0, v1) => v0.map((value, i) => value * (v1?.[i] || v1));

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V | number} v1
 * @returns {V}
 */
const div = (v0, v1) => v0.map((value, i) => value / (v1?.[i] || v1));

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V} v1
 * @returns {V}
 */
const dot = (v0, v1) => v0.reduce((dot, value, i) => dot + value * v1[i], 0);

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @returns {number}
 */
const len = (v0) =>
  Math.sqrt(v0.reduce((length, value) => length + value ** 2, 0));

/**
 * @template {vec2 | vec3} V
 * @param {V} v
 * @returns {V}
 */
const unit = (v) => {
  const l = len(v);
  return div(v, l);
};

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V} v1
 * @param {number} fraction
 * @returns {V}
 */
const lerp = (v0, v1, fraction) => add(mult(sub(v1, v0), fraction), v0);

/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V} v1
 * @returns {V}
 */
const min = (v0, v1) => v0.map((v, i) => Math.min(v, v1[i]));
/**
 * @template {vec2 | vec3} V
 * @param {V} v0
 * @param {V} v1
 * @returns {V}
 */
const max = (v0, v1) => v0.map((v, i) => Math.max(v, v1[i]));

/**
 * @template {vec2 | vec3} V
 * @param {V} v
 * @param {number} angle
 * @param {0 | 1 | 2} planeA
 * @param {0 | 1 | 2} planeB
 * @returns {V}
 */
const rotateByPlane = (v, angle, planeA, planeB) => {
  const cos = Math.cos(angle * Math.PI * 2);
  const sin = Math.sin(angle * Math.PI * 2);

  const A = v[planeA];
  const B = v[planeB];

  /**@type {V} */
  const vv = [...v];

  vv[planeA] = A * cos - B * sin;
  vv[planeB] = B * cos + A * sin;

  return vv;
};

/**
 * @param {vec3} v
 * @param {number} angle
 * @returns {vec3}
 */
const rotateX = (v, angle) => rotateByPlane(v, angle, 1, 2);
/**
 * @param {vec3} v
 * @param {number} angle
 * @returns {vec3}
 */
const rotateY = (v, angle) => rotateByPlane(v, angle, 1, 2);

/**
 * @template {vec2 | vec3} V
 * @param {V} v
 * @param {number} angle
 * @returns {V}
 */
const rotateZ = (v, angle) => rotateByPlane(v, angle, 0, 1);

/**
 * @param {vec3} v
 * @param {vec3} rotv
 * @returns {vec3}
 */
const rotate = (v, rotv) =>
  rotateX(rotateY(rotateZ(v, rotv[2]), rotv[1]), rotv[0]);

// x = r sin θ cos φ
// y = r sin θ sin φ
// z = r cos θ

/**
 * @template {vec2 | vec3} V
 * @param {V} v
 * @returns {V} r - θ - φ [in cycles 0-1]
 */
const toPolar = (v) => {
  const r = len(v);
  const a0 = Math.atan2(v[1], v[0]) / Math.PI;
  let a1 = v?.[2] != null ? Math.acos(v[2] / r) / Math.PI : null;
  if (a1) {
    return [r, a0, a1];
  }
  return [r, a0];
};

/**
 * @template {vec2 | vec3} V
 * @param {V} v r - θ - φ [in cycles 0-1]
 * @returns {V}
 */
const fromPolar = (v) => {
  const r = v[0];
  let x = r * Math.cos(v[1] * Math.PI);
  let y = r * Math.sin(v[1] * Math.PI);
  if (v?.[2]) {
    x *= Math.sin(v[2] * Math.PI);
    y *= Math.sin(v[2] * Math.PI);
    const z = r * Math.cos(v[2] * Math.PI);
    return [x, y, z];
  }
  return [x, y];
};

export default {
  vec2,
  vec3,
  add,
  sub,
  mult,
  div,
  len,
  dot,
  lerp,
  rotateX,
  rotateY,
  rotateZ,
  rotate,
  toPolar,
  fromPolar,
};
