const lodash = require("lodash");
const morgan = require("morgan");

const envelopesRouter = require("express").Router();
const Envelope = require("../db/model/envelope");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
} = require("./utils");
const { type } = require("express/lib/response");
const { reset } = require("nodemon");

envelopesRouter.use(morgan("dev"));

envelopesRouter.param("envelopeId", async (req, res, next, envelopeId) => {
  const envelope = await getFromDatabaseById("envelopes", { envelopeId });
  if (!envelope) return res.status(404).send();
  req.envelope = envelope;
  // console.log(req.envelope);
  next();
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
    console.log(error);
    res.status(400).send(error);
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
    console.log(error);
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
});

// PUT/PATCH/UPDATE envelope by Id
envelopesRouter.put("/:envelopeId", async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params.envelopeId);
  try {
    if (lodash.isEmpty(req.body))
      return res.status(400).send({ error: "Invalid update!" });
    const updatedEnvelope = await updateInstanceInDatabase(
      "envelopes",
      req.body,
      { envelopeId: req.envelope.envelopeId }
    );
    if (!updatedEnvelope) return res.status(404).send();
    if (updatedEnvelope.error)
      return res.status(400).send(updatedEnvelope.error);
    res.send(updatedEnvelope);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = envelopesRouter;
