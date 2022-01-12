const ideasRouter = require("express").Router();
const morgan = require("morgan");
const errorhandler = require("errorhandler");
ideasRouter.use(errorhandler());

module.exports = ideasRouter;
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.use(morgan("tiny"));
const ideas = getAllFromDatabase("ideas");

// /ideas Route
ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});
// GET all data
ideasRouter.get("/", (req, res, next) => {
  // console.log(ideas);
  res.send(getAllFromDatabase("ideas"));
});

// GET data by Id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const getIdea = req.idea;
  // console.log(req.params.ideaId);
  res.send(getIdea);
});

// POST a new data
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  // console.log(req.body);
  res.status(201).send(newIdea);
});

// PUT-UPDATE data
ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const updateIdea = updateInstanceInDatabase("ideas", req.body);
  // console.log(req.body);
  // console.log(`Update minion with (Id: ${req.params.ideaId})\n`, req.body);
  res.send(updateIdea);
});

// DELETE data
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleteIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleteIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
