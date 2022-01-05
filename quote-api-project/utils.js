const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Expected an array");
  return arr[Math.floor(Math.random() * arr.length)];
};

const getIndexById = (id, elementList) => {
  return elementList.findIndex((ele) => ele.id === Number.parseFloat(id));
};

const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error(
      ">>> pdateElement must be called with a valid id parameter"
    );
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

module.exports = {
  getRandomElement,
  getIndexById,
  updateElement,
};
