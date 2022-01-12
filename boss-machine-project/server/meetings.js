const meetingsRouter = require("express").Router();
const morgan = require("morgan");
const errorhandler = require("errorhandler");

module.exports = meetingsRouter;
const {
  createMeeting,
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
} = require("./db");

meetingsRouter.use(morgan("tiny"));

// /meetings Route
meetingsRouter.get("/", (req, res, next) => {
  // console.log(meetings);
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  let newMeetings = addToDatabase("meetings", createMeeting());
  console.log(newMeetings);
  res.status(201).send(newMeetings);
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
  // }
});
meetingsRouter.use(errorhandler());
