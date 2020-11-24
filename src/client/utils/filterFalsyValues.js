const filterFalsyValues = obj =>
  Object.keys(obj).reduce(
    (acc, key) =>
      obj[key]
        ? {
            ...acc,
            [key]: obj[key],
          }
        : acc,
    {},
  );

export default filterFalsyValues;
