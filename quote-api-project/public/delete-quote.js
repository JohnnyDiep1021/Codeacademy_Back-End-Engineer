const deleteButton = document.getElementById("delete-quote");
const newQuoteContainer = document.getElementById("new-quote");

deleteButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;
  // const quote = document.getElementById("quote").value;
  // const person = document.getElementById("person").value;

  // send the http request to the server-side
  fetch(`/api/quotes/${id}`, {
    method: "DELETE",
  });
  // promise return rejection, then the rest will not be executed
  // .then((response) => {
  //   console.log(response.json());
  //   return response.json();
  // })
  // .then((response) => response.json())
  // retrieve the http response from the server-side
  // .then((quote) => {
  //   const newQuote = document.createElement("div");
  //   console.log(quote);
  //   newQuote.innerHTML = `
  // <h3>Delete your quote successfully!</h3>
  // <div class="quote-text"><span>${quote.id}.</span> ${quote.quote}</div>
  // <div class="attribution">- ${quote.person}</div>
  // <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
  // `;
  //   newQuoteContainer.appendChild(newQuote);
  // });
});
