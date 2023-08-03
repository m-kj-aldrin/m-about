const ctx = Symbol();

const store = {
  [ctx]: null,
};

export const getCtx = () => store[ctx];
export const setCtx = (node) => {
  store[ctx] = node;
};
