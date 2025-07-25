//['page', 'limit', 'sortBy', 'sortOrder']

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[],
): Partial<T> => {
  const findObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      findObj[key] = obj[key];
    }
  }
  return findObj;
};

export default pick;
