type Scale = [number, number] | [number] | [undefined, number] | number | number[];
type Rotate = number;
type Translate = [number, number] | [number] | [undefined, number] | number[];

export interface Transform {
  scale?: Scale;
  rotate?: Rotate;
  translate?: Translate;
  transformOrigin?: string;
}

export default function ({ scale, rotate, translate }: Transform) {
  let scaleString = "";
  let rotateString = "";
  let translateString = "";

  if (scale) {
    if (Array.isArray(scale)) {
      scaleString = `scale(${scale?.[0] ?? 1} ${scale?.[1] ?? 1})`;
    } else {
      scaleString = `scale(${scale})`;
    }
  }
  if (rotate) {
    rotateString = `rotate(${rotate})`;
  }

  if (translate) {
    translateString = `translate(${translate?.[0] ?? 0} ${translate?.[1] ?? 0})`;
  }

  return `${translateString} ${rotateString} ${scaleString}`.trim() || undefined;
}
