import { rect } from "./rect";

/**
 * @typedef {Object} Faces
 * @property {import("./rect").Rect} front
 * @property {import("./rect").Rect} rear
 */

/**@typedef {typeof boxProto & {faces:Faces} & {children:import("./rect").Rect[]} } Box */

/**
 * @this {Box}
 * @param {import("@lib/utils/jsvec").vec3} vec Angles in cycles [0-1]
 * @returns {Box}
 * */
function rotate(vec) {
  Object.entries(this.faces).forEach(([name, rect]) => {
    rect.rotate(vec);
  });

  // sortFaces.call(this);
  return this;
}

export function sortFaces(faces) {
  return [...faces].sort(([_, a], [__, b]) => {
    const lenA = a.points.reduce((z, v) => z + v.length, 0);
    const lenB = b.points.reduce((z, v) => z + v.length, 0);

    const avgA = a.points.reduce((z, v) => z + v.z, 0);
    const avgB = b.points.reduce((z, v) => z + v.z, 0);

    // return lenA - lenB;
    return avgB - avgA;
  });
}

const boxProto = {
  width: 32,
  height: 32,
  depth: 32,
  rotate,
  getFace,
  // faces: ["rear", "front"],
  faces: {},
  children: [],
};

function getFace(name) {
  return {
    front: {
      width: this.width,
      height: this.height,
      translate: { z: -this.depth },
    },
    rear: {
      width: this.width,
      height: this.height,
      translate: { z: this.depth },
      rotate: { y: 0.5 },
    },
    left: {
      width: this.depth,
      height: this.height,
      translate: { x: -this.width },
      rotate: { y: -0.25 },
    },
    right: {
      width: this.depth,
      height: this.height,
      translate: { x: this.width },
      rotate: { y: 0.25 },
    },
    top: {
      width: this.width,
      height: this.depth,
      translate: { y: -this.height },
      rotate: { x: -0.25 },
    },
    bottom: {
      width: this.width,
      height: this.depth,
      translate: { y: this.height },
      rotate: { x: 0.25 },
    },
  }[name];
}

const faceNames = ["rear", "front", "left", "right", "top", "bottom"];

export function box() {
  /**@type {Box} */
  const newBox = Object.create(boxProto);

  faceNames.forEach((name) => {
    const faceOpt = newBox.getFace(name);
    const { width, height, rotate, translate } = faceOpt;
    const faceRect = rect({ width, height });

    rotate && faceRect.rotate({ x: 0, y: 0, z: 0, ...rotate });
    translate && faceRect.translate({ x: 0, y: 0, z: 0, ...translate });

    newBox.faces[name] = faceRect;
    // newBox.children.push({ name, rect: faceRect });
  });

  return newBox;
}
