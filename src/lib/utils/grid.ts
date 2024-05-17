import { range } from "./iter";
import type { vec2 } from "./vector";

interface Cell {
    x: number
    y: number
}

export const grid = (w: number, h: number) => range(h).flatMap(y => range(w).map((x): vec2 => [x, y]))
export const center = (o: Cell): Cell => ({ x: o.x - 0.5, y: o.y - 0.5 })
export const add = (w: number, h: number) => (o: Cell): Cell => ({ x: o.x + w, y: o.y + h })
export const mult = (w: number, h: number) => (o: Cell) => ({ x: o.x * w, y: o.y * h })