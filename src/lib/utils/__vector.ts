export interface vec2 {
    x: number,
    y: number
}

export const add = (...v: vec2[]): vec2 => v.reduce((prev, curr) => ({ x: curr.x + prev.x, y: curr.y + prev.y }))
export const sub = (...v: vec2[]): vec2 => v.reduce((prev, curr) => ({ x: curr.x - prev.x, y: curr.y - prev.y }))
export const mult = (v: vec2, s: number) => ({ x: v.x * s, y: v.y * s })
export const div = (v: vec2, d: number): vec2 => ({ x: v.x / d, y: v.y / d })

export const dot = (v0: vec2, v1: vec2): number => v0.x * v1.x + v0.y * v1.y


export const length = (v: vec2) => Math.sqrt(v.x ** 2 + v.y ** 2)

export const unit = (v: vec2): vec2 => {
    const l = length(v)
    return { x: v.x / l, y: v.y / l }
}

export const rotate = (v: vec2, a: number): vec2 => {
    return {
        x: v.x * Math.cos(Math.PI * a) - v.y * -Math.sin(Math.PI * a),
        y: v.x * Math.sin(Math.PI * a) + v.y * Math.cos(Math.PI * a)
    }
}