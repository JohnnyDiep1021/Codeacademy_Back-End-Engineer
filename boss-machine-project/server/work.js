// const minionsRouter = require("./minions");
// const workRouter = require("express").Router({ mergeParams: true });
// const {
//   getAllFromDatabase,
//   getFromDatabaseById,
//   addToDatabase,
//   updateInstanceInDatabase,
//   deleteFromDatabasebyId,
// } = require("./db");
// const morgan = require("morgan");
// const errorhandler = require("errorhandler");
// minionsRouter.use(errorhandler());
// minionsRouter.use(morgan("tiny"));
// minionsRouter.use("/:minionId/work", workRouter);

// workRouter.get("/", (req, res, next) => {
//   if (req.minion) {
//     console.log(getAllFromDatabase("work"));
//     res.send(getAllFromDatabase("work"));
//   }
// });
