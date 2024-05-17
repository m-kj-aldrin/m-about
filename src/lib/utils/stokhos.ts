export const rand = () => Math.random();
export const frand = (a: number, b: number) => rand() * (b - a) + a;
export const irand = (a: number, b: number) => Math.floor(frand(a, b));

export const chance = (ratio: number) => rand() < ratio;

export const stickyChance = (ratio, stickyness) => {
    let stickState = chance(ratio);
    let offset = 1 - ratio;
    return {
        next() {
            let c;

            if (stickState) {
                c = chance(ratio + offset);
            } else {
                c = chance(ratio - offset);
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
