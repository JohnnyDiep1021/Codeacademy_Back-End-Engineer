const minionsRouter = require("express").Router();
const workRouter = require("express").Router({ mergeParams: true });
module.exports = minionsRouter;
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  getWorkByMinionId,
  addToDatabase,
  // updateWorkById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");
const minions = getAllFromDatabase("minions");

const morgan = require("morgan");
const errorhandler = require("errorhandler");
minionsRouter.use(errorhandler());
minionsRouter.use(morgan("tiny"));
minionsRouter.use("/:minionId/work", workRouter);

// /minions Route
minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    req.works = getWorkByMinionId("work", req.minion);
    console.log("GET all works", req.works);
    next();
  } else {
    res.status(404).send();
  }
});

workRouter.param("workId", (req, res, next, id) => {
  // const workId = req.works.find((work) => Number(work.id) === Number(id));
  const workId = req.params.workId;
  if (workId) {
    req.workId = workId;
    next();
  } else {
    res.status(404).send();
  }
});
// GET all data
minionsRouter.get("/", (req, res, next) => {
  // console.log(getAllFromDatabase("work"));

  // console.log(minions);
  res.send(minions);
});

// minionsRouter.get("/:minionId/work", (req, res, next) => {
//   // console.log(minions);
//   res.send(getAllFromDatabase("work"));
// });
// GET data by Id
minionsRouter.get("/:minionId", (req, res, next) => {
  // console.log(req.params);
  const getMinion = req.minion;
  if (getMinion) {
    console.log(getMinion);
    res.send(getMinion);
  } else {
    res.status(404).send();
  }
});

// POST new data
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  if (newMinion) {
    // newMinion.id = `${Number(minions[minions.length - 1].id) + 1}`;
    console.log("Added a new minion!", newMinion);
    res.status(201).send(newMinion);
  } else {
    res.status(400).send();
  }
});

// PUT-UPDATE data
minionsRouter.put("/:minionId", (req, res, next) => {
  const updateMinion = updateInstanceInDatabase("minions", req.body);
  if (updateMinion) {
    // console.log(`Update minion with (Id: ${req.params.minionId})\n`, req.body);
    res.send(updateMinion);
  } else {
    res.status(404).send();
  }
});

// DELETE data
minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleteMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleteMinion) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// work Route
workRouter.get("/", (req, res, next) => {
  // console.log(getAllFromDatabase("work").minionId);
  // console.log(req.minion.id);
  res.send(req.works);
});

workRouter.post("/", (req, res, next) => {
  const newWork = addToDatabase("work", req.body);
  if (newWork) {
    // newWork.id = `${Number(req.works[req.works.length - 1].id) + 1}`;
    console.log(req.params, newWork);
    res.status(201).send(newWork);
  } else {
    res.status(400).send(">>> Hours must be number");
  }
});

workRouter.put("/:workId", (req, res, next) => {
  console.log("PUT-UPDATE work!", req.body.minionId, req.body.id);
  const updateWork = updateInstanceInDatabase("work", req.body);
  if (updateWork) {
    res.send(updateWork);
  } else {
    res.status(400).send("");
  }
});

workRouter.delete("/:workId", (req, res, next) => {
  const deleteWork = deleteFromDatabasebyId("work", req.workId);
  if (deleteWork) {
    console.log("DELETE work", req.workId);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
