const res = require("express/lib/response");
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
    const data = await model.findOne({ envelopeId: id });
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

const updateInstanceInDatabase = async function (modelType, instance) {
  try {
    const model = findDatabaseByName(modelType);
    if (model === null) throw new Error(`Invalid database model!`);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
};
