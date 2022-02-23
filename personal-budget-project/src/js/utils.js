const Envelope = require("../db/model/envelope");

const findDatabaseByName = function (name) {
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

const getAllFromDatabase = async function (modelType) {
  try {
    const model = findDatabaseByName(modelType);
    if (model === null) throw new Error(`Invalid database model!`);
    return await model.find({});
  } catch (error) {
    throw error;
  }
};

const getFromDatabaseById = async function (modelType, id) {
  try {
    const model = findDatabaseByName(modelType);
    if (model === null) throw new Error(`Invalid database model!`);
    // const data = await model.findOne({ envelopeId: id });
    const data = await model.findOne(id);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {string} modelType
 * @param {object} instance
 * @returns a promise
 */
const addToDatabase = async function (modelType, instance) {
  try {
    const model = findDatabaseByName(modelType);
    if (model === null) throw new Error(`Invalid database model!`);
    instance.envelopeId = createRandomId(9);
    const data = new model(instance);
    await data.save();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateInstanceInDatabase = async function (modelType, instance, id) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    const data = await model.findOne(id);
    // const data = await getFromDatabaseById(modelType, id);
    if (!data) return null;

    const updates = Object.keys(instance);
    // console.log(updates);

    const updateFields = await model.getProperty();
    // console.log(updateFields);

    const isValidUpdate = updates.every((update) =>
      updateFields.includes(update)
    );
    if (!isValidUpdate) return { error: `Invalid updates!` };

    updates.forEach((update) => (data[update] = instance[update]));
    await data.save();
    return instance;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
};
