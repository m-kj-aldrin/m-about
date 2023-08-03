// export const remap (v:number,min:number,max:number)
export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export function randn_bm() {
    let u = 1 - Math.random(); //Converting [0,1) to (0,1)
    let v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export const cos = (x: number) => Math.cos(Math.PI * 2 * x)
export const sin = (x: number) => Math.sin(Math.PI * 2 * x)