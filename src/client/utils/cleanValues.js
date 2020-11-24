const cleanValues = obj =>
  Object.keys(obj).reduce(
    (acc, key) =>
      typeof obj[key] !== 'undefined'
        ? {
            ...acc,
            [key]: obj[key],
          }
        : acc,
    {},
  );

export default cleanValues;
