const updateButton = document.getElementById("update-quote");
const newQuoteContainer = document.getElementById("new-quote");

updateButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;

  fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((quote) => {
      const newQuote = document.createElement("div");
      // console.log(quote);
      newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text"><span>${quote.id}.</span> ${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
      newQuoteContainer.appendChild(newQuote);
    });
});
