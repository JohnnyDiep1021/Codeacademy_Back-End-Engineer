const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
// require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => {
  // attach headers to the response
  // '*' allow to get accessed by all domains
  // allow any domains to send the request
  // ignore by Postman
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Headers`,
    // the first two is set automatically
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );
  res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
  next();
});
const apiRouter = require("./src/server/api");
app.use("/api", apiRouter);

mongoose
  .connect(
    "mongodb+srv://taskapp:Fairytailmeothui2001@cluster0.2lb1a.mongodb.net/personal-budget-api?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
