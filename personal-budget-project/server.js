const express = require("express");
require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const apiRouter = require("./src/js/api");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
