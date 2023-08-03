/**
 *  @typedef {(typeof rectProto & {points:import("@lib/utils/jsvec").vector[]})} Rect
 */

import v from "@lib/utils/jsvec";

/**
 * @this {Rect}
 * @param {import("@lib/utils/jsvec").vec3} vec Angles in cycles [0-1]
 * @returns {Rect}
 * */
function rotate(vec) {
  this.points.forEach((v) => {
    v.rotate(vec);
  });
  return this;
}
/**
 * @this {Rect}
 * @param {import("@lib/utils/jsvec").vec3} vec Translate vector
 * @returns {Rect}
 * */
function translate(vec) {
  this.points.forEach((v) => {
    v.add(vec);
  });
  return this;
}

const rectProto = {
  width: 1,
  height: 1,
  rotate,
  translate,
};

/**
 * @param {{width:number,height:number,pos?:Partial<vec3>}}
 */
export function rect({ width, height, pos }) {
  /**@type {Rect} */
  const newRect = Object.create(rectProto);
  //   const { width, height } = newRect;
  pos = { x: 0, y: 0, z: 0, ...pos };

  newRect.points = [
    jsvec({ x: -width + pos.x, y: -height + pos.y, z: pos.z }),
    jsvec({ x: width + pos.x, y: -height + pos.y, z: pos.z }),
    jsvec({ x: width + pos.x, y: height + pos.y, z: pos.z }),
    jsvec({ x: -width + pos.x, y: height + pos.y, z: pos.z }),
  ];
  return newRect;
}
