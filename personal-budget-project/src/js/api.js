const express = require("express");
const apiRouter = express.Router();

const envelopeRouter = require("./envelopes");

apiRouter.use("/envelopes", envelopeRouter);

module.exports = apiRouter;
