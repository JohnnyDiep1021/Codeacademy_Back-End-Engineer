const express = require("express");
const mongoose = require("mongoose");
// require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const apiRouter = require("./src/server/api");
app.use("/api", apiRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/budget-manager-api")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
