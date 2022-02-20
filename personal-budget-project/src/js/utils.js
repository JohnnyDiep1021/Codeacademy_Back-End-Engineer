const Envelope = require("../db/model/envelope");
const findDataArrayByName = function (name) {
  switch (name) {
    case "envelopes":
      return Envelope;
    default:
      return null;
  }
};

const generateRandomInt = function (max) {
  return Math.floor(Math.random() * max) + 1;
};
const createRandomId = function (max) {
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += generateRandomInt(max);
  }
  return id;
};
const addToDatabase = async function (modelType, instance) {
  const model = findDataArrayByName(modelType);
  try {
    if (model === null) throw new Error(`Invalid database model!`);
    instance.envelopeId = createRandomId(9);
    const data = new model(instance);
    await data.save();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addToDatabase,
};
