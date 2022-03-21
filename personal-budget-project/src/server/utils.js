const Envelope = require("../db/model/envelope");
const User = require("../db/model/user");
const lodash = require("lodash");

const findDatabaseByName = function (name) {
  switch (name) {
    case "envelopes":
      return Envelope;
    case "users":
      return User;
    default:
      return null;
  }
};

const generateRandomInt = function (max) {
  return Math.floor(Math.random() * max) + 1;
};
const createRandomId = function (max) {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += generateRandomInt(max);
  }
  return id;
};

const getAllFromDatabase = async function (modelType, ownerId = "") {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    // return statement in switch statement works exactly like if/else statement => no need for break statement
    switch (modelType) {
      case "envelopes":
        if (!ownerId) return null;
        return await model.find({ owner: ownerId });
      default:
        return await model.find({});
    }
  } catch (error) {
    throw error;
  }
};

const getFromDatabaseById = async function (
  modelType,
  id,
  ownerId = undefined
) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    // const data = await model.findOne({ envelopeId: id });
    switch (modelType) {
      case "envelopes":
        if (!ownerId) return null;
        return await model.findOne({ ...id, owner: ownerId });
      default:
        return await model.findOne(id);
    }
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
const addToDatabase = async function (
  modelType,
  instance,
  ownerId = "",
  idName = "Id"
) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    const id = modelType.slice(0, modelType.length - 1) + "Id";
    instance[id] = createRandomId(9);

    let data;
    // if (modelType === "envelopes" && ownerId) {
    //   data = new model({ ...instance, owner: ownerId });
    // }
    switch (modelType) {
      case "envelopes":
        if (ownerId) {
          data = new model({ ...instance, owner: ownerId });
          break;
        }
      default:
        data = new model(instance);
    }
    await data.save();

    if (modelType === "users") {
      const token = await data.generateAuthToken();
      return { data, token };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const updateInstanceInDatabase = async function (
  modelType,
  instance,
  id = undefined,
  ownerId = undefined,
  data = undefined
) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    // find existing data if no argument is passed to data param
    if (!data) data = await model.findOne(id);

    // if no data is found, return null
    if (!data) {
      const err = new Error("No data was found!");
      err.status = 404;
      throw err;
    }

    // throw err when get no new data to update
    if (lodash.isEmpty(instance)) {
      const err = new Error("Please, provide new information to update");
      err.status = 400;
      throw err;
    }
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

const transferBudget = async function (
  { from: fromId, to: toId } = {},
  { amount } = { amount: 0 },
  ownerId = undefined,
  modelType = "envelopes"
) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);

    if (!fromId || !toId) {
      const err = new Error(`Inadequate information to transfer money`);
      err.status(400);
      throw err;
    }

    const fromEnvId = await model.findOne({
      envelopeId: fromId,
      owner: ownerId,
    });
    const toEnvId = await model.findOne({ envelopeId: toId, owner: ownerId });
    if (!fromEnvId || !toEnvId) return { error: "Invalid envelope Id!" };

    if (amount < 0) throw new Error("Positive numbers are required!");
    if (fromEnvId.budget < amount)
      throw new Error("Budget is inadequate to complete transaction!");
    fromEnvId.budget -= amount;
    toEnvId.budget += amount;
    fromEnvId.save();
    toEnvId.save();

    return true;
  } catch (error) {
    error.status = 400;
    throw error;
  }
};

const deleteFromDatabaseById = async function (modelType, id) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model`);

    const deleteResult = await model.deleteOne(id);
    return deleteResult.deletedCount;
  } catch (error) {
    throw error;
  }
};

const deleteAllFromDatabase = async function (modelType, ownerId = undefined) {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) throw new Error(`Invalid database model!`);
    let deleteResult = {
      deletedCount: 0,
    };
    switch (modelType) {
      case "envelopes":
        if (!ownerId) return deleteResult.deletedCount;
        deleteResult = await model.deleteMany({ owner: ownerId });
        break;
      default:
        deleteResult = await model.deleteMany();
    }
    return deleteResult.deletedCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  transferBudget,
  deleteFromDatabaseById,
  deleteAllFromDatabase,
};
