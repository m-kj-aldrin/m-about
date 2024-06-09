type RangeFunction = {
  <T>(size: number, fill: (index: number, array: T[]) => T): T[];
  (size: number): undefined[];
};

export const range: RangeFunction = <T>(
  size: number,
  fill?: (index: number, array: T[]) => T
): T[] | undefined[] => {
  const result = new Array<T | undefined>(size);
  if (fill !== undefined) {
    for (let i = 0; i < size; i++) {
      result[i] = fill(i, result as T[]);
    }
    return result as T[];
  } else {
    //@ts-ignore
    return result.fill(undefined);
  }
};
