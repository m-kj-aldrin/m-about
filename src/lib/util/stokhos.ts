export const rand = (a = 0, b = 1) => Math.random() * (b - a) + a;
export const irand = (a: number, b: number) => Math.floor(rand(a, b));

export function randn_bm() {
    let u = 1 - Math.random(); //Converting [0,1) to (0,1)
    let v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export const chance = (ratio: number) => rand() < ratio;
export const bm_chance = (ratio: number) => randn_bm() < ratio;

export const pick = <const T extends unknown[]>(choices: T): T[number] =>
    choices[irand(0, choices.length)];
