export const remap = (
  v: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => {
  let fromSpan = fromMax - fromMin;
  let toSpan = toMax - toMin;
  let normalValue = v / fromSpan;
  return normalValue * toSpan + toMin;
};

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export const cos = (x: number) => Math.cos(Math.PI * 2 * x);
export const sin = (x: number) => Math.sin(Math.PI * 2 * x);

export const isEven = (x: number) => x % 2 == 0;
