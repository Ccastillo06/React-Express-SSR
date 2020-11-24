const normalizeData = dataArray => {
  const allIds = dataArray.map(({ id }) => id);

  const dataById = dataArray.reduce(
    (acc, next) => ({
      ...acc,
      [next.id]: next,
    }),
    {},
  );

  return {
    allIds,
    dataById,
  };
};

export default normalizeData;
