export const IF = (
    value: boolean,
    cb: any | (() => HTMLElement | HTMLElement[])
) => {
    if (value) {
        if (typeof cb === "function") {
            return cb();
        }
        return cb;
    }
    return "";
};

export const SWITCH =
    <D>(dictionary: D) =>
    (value: keyof D) => {
        return dictionary[value];
    };
