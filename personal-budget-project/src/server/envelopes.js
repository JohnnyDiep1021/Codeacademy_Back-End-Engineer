const envelopesRouter = require("express").Router();

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

envelopesRouter.param("envelopeId", async (req, res, next, envelopeId) => {
  //In router.param, although the error will be caught by the error-handling middle, the route handler embedded with the route parameter will still be fired
  const envelope = await getFromDatabaseById("envelopes", { envelopeId });
  if (!envelope) {
    const err = new Error("Cannot find envelope with the provided Id");
    err.status = 404;
    next(err);
    // return res.status(404).send()
  } else {
    req.envelope = envelope;
    next();
  }
});

// POST/CREATE new envelope
envelopesRouter.post("/", async (req, res, next) => {
  // Method-1
  // const envelope = new Envelope(req.body);
  // try {
  //   await envelope.save();
  //   res.status(201).send(envelope);
  // } catch (error) {
  //   res.status(400).send(error);
  // }

  // Method-2
  try {
    const newEnvelope = await addToDatabase("envelopes", req.body);
    console.log("Envelope added!", newEnvelope);
    res.status(201).send(newEnvelope);
  } catch (error) {
    error.status = 400;
    error.message = "Missing requisite information to create a new envelope";
    next(error);
    // res.status(400).send(error);
  }
});

// GET/READ all envelopes
envelopesRouter.get("/", async (req, res, next) => {
  // Method-1
  // try {
  //   const envelope = await Envelope.find({});
  //   console.log(envelope.length);
  //   res.send(envelope);
  // } catch (error) {
  //   res.status(500).send(error);
  // }

  // Method-2
  try {
    const data = await getAllFromDatabase("envelopes");
    res.send(data);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// GET/READ envelope by Id
envelopesRouter.get("/:envelopeId", async (req, res, next) => {
  // Method-1
  // const id = req.params.envelopeId;
  // try {
  //   const envelope = await Envelope.findOne({ envelopeId: id });
  //   if (!envelope) return res.status(404).send(`Invalid envelopeId!`);
  //   res.send(envelope);
  // } catch (error) {
  //   res.status(500).send(error);
  // }

  // Method-2
  try {
    res.send(req.envelope);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// PUT/PATCH/UPDATE envelope by Id
envelopesRouter.put("/:envelopeId", async (req, res, next) => {
  console.log(`Request received!`);
  try {
    if (lodash.isEmpty(req.body)) {
      const err = new Error("Please, provide new information to update");
      err.status = 400;
      next(err);
      // return res.status(400).send({ error: "Invalid update!" });
    }
    const updatedEnvelope = await updateInstanceInDatabase(
      "envelopes",
      req.body,
      { envelopeId: req.envelope.envelopeId }
    );
    // if (!updatedEnvelope) return res.status(404).send();
    if (updatedEnvelope.error) {
      const err = new Error(updatedEnvelope.error);
      err.status = 400;
      next(err);
      // return res.status(400).send(updatedEnvelope.error);
    }
    res.send(updatedEnvelope);
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// TRANSFER BUDGET
envelopesRouter.post("/transfer/:from/:to", async (req, res, next) => {
  try {
    const transfer = await transferBudget(req.params, req.body);

    if (transfer.error) {
      const err = new Error(transfer.error);
      err.status = 404;
      next(err);
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
    const deletedEnvelope = await deleteFromDatabaseById(
      {
        envelopeId: req.envelope.envelopeId,
      },
      "envelopes"
    );
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// DELETE all envelopes
envelopesRouter.delete("/", async (req, res, next) => {
  try {
    // In router.delete, passing an argument to the middleware next() will not stop the execution of the code followed it.
    const deletedEnvelopes = await deleteAllFromDatabase("envelopes");
    if (deletedEnvelopes === 0) {
      const err = new Error(`No envelope(s) to delete`);
      err.status = 400;
      next(err);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});
envelopesRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = envelopesRouter;
