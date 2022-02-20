const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
