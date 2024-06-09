// Define interfaces for each command type
interface MoveTo {
  c: "m";
  p?: { dx?: number; dy?: number };
}

interface AbsoluteMoveTo {
  c: "M";
  p?: { x?: number; y?: number };
}

interface HorizontalMove {
  c: "h";
  p: { dx: number };
}

interface VerticalMove {
  c: "v";
  p: { dy: number };
}

interface LineTo {
  c: "l";
  p: { dx: number; dy: number };
}

interface AbsoluteLineTo {
  c: "L";
  p: { x: number; y: number };
}

interface CubicBezierCurve {
  c: "c";
  p: {
    dx1: number;
    dy1: number;
    dx2: number;
    dy2: number;
    dx: number;
    dy: number;
  };
}

interface AbsoluteCubicBezierCurve {
  c: "C";
  p: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: number;
    y: number;
  };
}

interface Arc {
  c: "a";
  p: {
    rx?: number;
    ry?: number;
    rotation?: number;
    largeArc?: boolean;
    sweep?: boolean;
    dx?: number;
    dy?: number;
  };
}

interface AbsoluteArc {
  c: "A";
  p: {
    rx?: number;
    ry?: number;
    rotation?: number;
    largeArc?: boolean;
    sweep?: boolean;
    x?: number;
    y?: number;
  };
}

interface ClosePath {
  c: "z";
}

// Create a discriminated union of all command types
export type Command =
  | MoveTo
  | AbsoluteMoveTo
  | HorizontalMove
  | VerticalMove
  | LineTo
  | AbsoluteLineTo
  | CubicBezierCurve
  | AbsoluteCubicBezierCurve
  | Arc
  | AbsoluteArc
  | ClosePath;
