const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randQuote = getRandomElement(quotes);
  console.log(randQuote);
  res.send({ quote: randQuote });
});

app.get("/api/quotes", (req, res, next) => {
  const author = req.query.person;
  if (author) {
    res.send({ quotes: quotes.filter((quote) => quote.person === author) });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  const newQuote = req.query;
  console.log(newQuote);
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
