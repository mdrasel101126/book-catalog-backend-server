export const removeFields = <
  T extends Record<string, unknown>,
  k extends keyof T
>(
  obj: T,
  keys: k[]
): Partial<T> => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
