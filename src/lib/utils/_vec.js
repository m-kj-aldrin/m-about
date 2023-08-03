/**
 * @typedef {Object} vec2
 * @prop {number} x
 * @prop {number} y
 */

/**@typedef {typeof vec2Prototype & vec2} Vector2D */

/**
 * @param {Vector2D} v
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function add(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
}

/**
 * @param {Vector2D} v
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function sub(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
}

/**
 * @param {Vector2D} v
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function mult(scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
}

/**
 * @param {Vector2D} v
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function div(scalar) {
  this.x /= scalar;
  this.y /= scalar;
  return this;
}

/**
 * @this {Vector2D}
 * @param {Vector2D} v
 * @returns {number}
 */
function dot(v) {
  return this.x * v.x + this.y + v.y;
}

/**
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function unit() {
  const l = this.len();
  this.div(v, l);
  return this;
}

/**
 * @param {Vector2D} v
 * @param {number} fraction
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function lerp(v, fraction) {
  const start = this.copy();
  this.sub(v).mult(-fraction).add(start);
  return this;
}
/**
 * @param {Vector2D} v0
 * @param {Vector2D} v1
 * @returns {Vector2D}
 */
function min(v0, v1) {
  return vector2D({
    x: Math.min(v0.x, v1.x),
    y: Math.min(v0.y, v1.y),
  });
}

/**
 * @param {Vector2D} v0
 * @param {Vector2D} v1
 * @returns {Vector2D}
 */
function max(v0, v1) {
  return vector2D({
    x: Math.max(v0.x, v1.x),
    y: Math.max(v0.y, v1.y),
  });
}

/**
 * @this {Vector2D}
 * @param {number} angle
 * @returns {Vector2D}
 */
function rotate(angle) {
  const cos = Math.cos(angle * Math.PI * 2);
  const sin = Math.sin(angle * Math.PI * 2);

  const x = this.x;
  const y = this.y;

  this.x = x * cos - y * sin;
  this.y = y * cos + x * sin;

  return this;
}

/**
 * @param {Vector2D} v
 * @returns {Vector2D}
 */
function toPolar(v) {
  const r = v.len();
  const newVec = vector2D({
    x: r,
    y: Math.atan2(v.y, v.x) / Math.PI,
  });
  return newVec;
}

/**
 * @param {{r:number,angle:number}} v
 * @returns {Vector2D}
 */
function fromPolar({ r = 0, angle = 0 } = {}) {
  const newVec = vector2D({
    x: r * Math.cos(r * Math.PI),
    y: r * Math.sin(r * Math.PI),
  });
  return newVec;
}

/**
 * @this {Vector2D}
 * @returns {Vector2D}
 */
function copy() {
  return vector2D(this);
}

const vec2Prototype = {
  add,
  sub,
  mult,
  div,
  dot,
  unit,
  lerp,
  copy,
  rotate,
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  },
};

/**
 * @param {vec2} o
 * @returns {Vector2D}
 * */
export default function vector2D({ x = 0, y = 0 } = {}) {
  /**@type {Vector2D} */
  const newVec = Object.create(vec2Prototype);
  newVec.x = x;
  newVec.y = y;

  return newVec;
}

vector2D.toPolar = toPolar;
vector2D.fromPolar = fromPolar;
vector2D.min = min;
vector2D.max = max;
