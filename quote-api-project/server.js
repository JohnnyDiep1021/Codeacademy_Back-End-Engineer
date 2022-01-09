const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement, getIndexById, updateElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// fetch single random quotes
app.get("/api/quotes/random", (req, res, next) => {
  const randQuote = getRandomElement(quotes);
  // console.log(randQuote);
  res.send({ quote: randQuote });
});

app.get("/api/quotes", (req, res, next) => {
  const author = req.query.person;
  const id = req.query.id;
  if (author) {
    // fetch only quotes of given author
    res.send({ quotes: quotes.filter((quote) => quote.person === author) });
  } else if (id) {
    // fetch only quotes of given id
    res.send({
      quotes: quotes.filter((quote) => quote.id === Number.parseFloat(id)),
    });
  } else {
    // fetch all quotes
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  // Using increment (++) or decrement (--) to update arr.length will result in a new empty item created.
  // const newQuote = req.query;
  const newQuoteObj = { id: quotes.length + 1, ...req.query };
  if (newQuoteObj.quote && newQuoteObj.person) {
    console.log(newQuoteObj);
    quotes.push(newQuoteObj);
    // console.log(quotes);
    res.send({ quote: newQuoteObj });
  } else {
    res.status(400).send();
  }
});

// Get the http request from the client-side and handle request
app.put("/api/quotes/:id", (req, res, next) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if (quoteIndex !== -1) {
    console.log("Update Quote", req.params, req.query);
    updateElement(req.params.id, req.query, quotes);
    // Send back the http response to the client-side
    res.send(quotes[quoteIndex]);
  } else {
    res.status(404).send();
  }
});

app.delete("/api/quotes/:id", (req, res, next) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if (quoteIndex !== -1) {
    const deleteQuote = quotes.splice(quoteIndex, 1)[0];
    console.log("Delete Quote", deleteQuote);
    // res.status(204).send(deleteQuote);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
