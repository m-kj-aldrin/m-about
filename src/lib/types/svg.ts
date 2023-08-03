type Fill = string;

type Stroke = string;
type StrokeWidth = number;
type StrokeDashArray = number[];
type StrokeLineJoin = "round" | "bevel" | "mitter";
type StrokeLineCap = "round" | "square" | "butt";

type Transform = string;

type Opacity = number;
type FillOpacity = number;
type StrokeOpacity = number;

export type Vec2 = { x: number; y: number };

export interface SVGProps {
  fill?: Fill;
  stroke?: Stroke;
  ["stroke-width"]?: StrokeWidth;
  ["stroke-opacity"]?: StrokeOpacity;
  ["stroke-dasharray"]?: StrokeDashArray;
  ["stroke-linejoin"]?: StrokeLineJoin;
  ["stroke-linecap"]?: StrokeLineCap;
  transform?: Transform;
  opacity?: Opacity;
  ["fill-opacity"]?: FillOpacity;
}
