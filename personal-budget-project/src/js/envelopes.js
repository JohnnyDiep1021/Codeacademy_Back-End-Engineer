const envelopesRouter = require("express").Router();
const Envelope = require("../db/model/envelope");
const morgan = require("morgan");
const { addToDatabase } = require("./utils");

envelopesRouter.use(morgan("dev"));

envelopesRouter.get("/", async (req, res, next) => {
  try {
    const envelope = await Envelope.find({});
    console.log(envelope.length);
    res.send(envelope);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    res.status(400).send(error);
  }
});
module.exports = envelopesRouter;
