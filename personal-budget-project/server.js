const express = require("express");
const mongoose = require("mongoose");
// require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  // '*' allow to access all domains
  // allow any domains to send the request
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );
  res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
});
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
