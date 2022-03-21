const envelopesRouter = require("express").Router();
const auth = require("../middleware/auth");

// 3rd party module/lib
const lodash = require("lodash");
const morgan = require("morgan");
/*
// http://expressjs.com/en/resources/middleware/errorhandler.html
const errorhandler = require("errorhandler");
if (process.env.NODE_ENV === "development") {
  // only use in development
  envelopesRouter.use(errorhandler({ log: false }));
}
*/
envelopesRouter.use(morgan("dev"));

const Envelope = require("../db/model/envelope");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
  deleteAllFromDatabase,
  transferBudget,
} = require("./utils");
const { type, append } = require("express/lib/response");
const { reset } = require("nodemon");

// This will run before router.use()
// METHOD-1 => using router.param() cannot accept auth middleware function => fail to authenticate user
// envelopesRouter.param("envelopeId", async (req, res, next, envelopeId) => {})

// METHOD-2 => using router.use() will be more efficient coz it can perform authentication by using auth middleware function for every route handler with "/:envelopeId"
// envelopesRouter.use("/:envelopeId", auth, async (req, res, next) => { }
// envelopesRouter.use(/\/\:envelopeId$/, auth, async (req, res, next) => { }
envelopesRouter.use("/:envelopeId$/", auth, async (req, res, next) => {
  // next() middleware will not stop the execution of the code following it, use return next() instead
  try {
    console.log(req.params);
    const envelope = await getFromDatabaseById(
      "envelopes",
      { envelopeId: req.params.envelopeId },
      req.user._id
    );
    // console.log(envelope);
    if (!envelope) {
      const err = new Error("Cannot find envelope with the provided Id");
      err.status = 404;
      return next(err);
      // return res.status(404).send()
    }
    req.envelope = envelope;
    next();
  } catch (err) {
    next(err);
  }
});

// POST/CREATE new envelope
envelopesRouter.post("/", auth, async (req, res, next) => {
  try {
    const newEnvelope = await addToDatabase(
      "envelopes",
      req.body,
      req.user._id
    );
    console.log("Envelope added!", newEnvelope);
    res.status(201).send(newEnvelope);
  } catch (error) {
    console.log(error);
    error.status = 400;
    error.message = "Missing requisite information to create a new envelope";
    next(error);
    // res.status(400).send(error);
  }
});

// GET/READ all envelopes
envelopesRouter.get("/", auth, async (req, res, next) => {
  try {
    const data = await getAllFromDatabase("envelopes", req.user._id);
    if (!data) {
      const err = new Error(`No data was found!`);
      err.status = 404;
      throw err;
    }
    res.send(data);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// GET/READ envelope by Id
envelopesRouter.get("/:envelopeId", async (req, res, next) => {
  try {
    res.send(req.envelope);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// PUT/PATCH/UPDATE envelope by Id
envelopesRouter.put("/:envelopeId", async (req, res, next) => {
  try {
    const updatedEnvelope = await updateInstanceInDatabase(
      "envelopes",
      req.body,
      undefined,
      req.user._id,
      req.envelope
    );

    if (updatedEnvelope.error) {
      const err = new Error(updatedEnvelope.error);
      err.status = 400;
      return next(err);
      // return res.status(400).send(updatedEnvelope.error);
    }
    res.send(updatedEnvelope);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// TRANSFER BUDGET
envelopesRouter.post("/transfer/:from/:to", auth, async (req, res, next) => {
  try {
    console.log(req.params);
    const transfer = await transferBudget(req.params, req.body, req.user._id);

    if (transfer.error) {
      const err = new Error(transfer.error);
      err.status = 404;
      return next(err);
      // return res.status(404).send(transfer.error)
    }
    res.send({ message: "Transfer budget successfully!" });
  } catch (error) {
    next(error);
    // res.status(500).send();
  }
});

// DELETE an envelope by envelopeId
envelopesRouter.delete("/:envelopeId", async (req, res, next) => {
  try {
    const deletedEnvelope = await deleteFromDatabaseById("envelopes", {
      envelopeId: req.envelope.envelopeId,
    });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// DELETE all envelopes
envelopesRouter.delete("/", auth, async (req, res, next) => {
  try {
    const deletedEnvelopes = await deleteAllFromDatabase(
      "envelopes",
      req.user._id
    );
    if (deletedEnvelopes === 0) {
      const err = new Error(`No envelope(s) to delete`);
      err.status = 400;
      return next(err);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
envelopesRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = envelopesRouter;