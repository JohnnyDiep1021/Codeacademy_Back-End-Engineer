const express = require("express");
const mongoose = require("mongoose");
// require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

// // // cors must be set at the very beginning of the project
// // // Working with Cross Origin Resource Sharing
// // // Method - 1: manual setting
// app.use((req, res, next) => {
//   // attach headers to the response
//   // '*' allow to get accessed by all domains
//   // allow any domains to send the request
//   // ignore by Postman
//   res.setHeader(`Access-Control-Allow-Origin`, `*`);
//   res.setHeader(
//     `Access-Control-Allow-Headers`,
//     // the first two is set automatically
//     `Origin, X-Requested-With, X-Custom-Header, Content-Type, Accept, Authorization`
//   );
//   res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
//   next();
// });

// // Method - 2: use cors module
const cors = require("cors");
app.use(cors());

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const morgan = require("morgan");
app.use(morgan("dev"));

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
