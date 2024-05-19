import { randn_bm } from "./map";

export const rand = () => Math.random();
export const frand = (a: number, b: number) => rand() * (b - a) + a;
export const irand = (a: number, b: number) => Math.floor(frand(a, b));

export const chance = (ratio: number, r_fn = rand) => r_fn() < ratio;
export const bm_chance = (r: number) => chance(r, randn_bm);

export const pick = <T>(choices: T[]) => choices[irand(0, choices.length)];

export const stickyChance = (ratio: number, stickyness: number) => {
    let stickState = chance(ratio, randn_bm);
    let offset = 1 - ratio;
    return {
        next() {
            let c;

            if (stickState) {
                c = chance(ratio + offset, randn_bm);
            } else {
                c = chance(ratio - offset, randn_bm);
            }

            if (c != stickState) {
                offset = 1 - ratio;
            } else {
                Math.max((offset -= stickyness), 0);
            }
            stickState = c;

            return c;
        },
        reset() {
            offset = 1 - ratio;
            stickState = !stickState;
        },
    };
};
