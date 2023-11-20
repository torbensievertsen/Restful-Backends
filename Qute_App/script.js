const button = document.querySelector("#button");
const state = { quote: "", author: "" };

button.addEventListener("click", newQuote);

function newQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((JsonData) => {
      state.author = JsonData.author;
      state.quote = JsonData.quote;
      render();
    });
}

function render() {
  document.querySelector("main").innerText = "";
  const p = document.createElement("p");
  p.style.fontSize = "2rem";
  p.innerText = state.quote;
  const p2 = document.createElement("p");
  p2.innerText = "-" + state.author;
  document.querySelector("main").appendChild(p);
  document.querySelector("main").appendChild(p2);
}
