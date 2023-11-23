const grid = document.querySelector("#grid");
const bod = document.querySelector("body");
const pendingCount = document.querySelector("#pendingCount");
let counter = localStorage.getItem("counter") || 0;
let newUser = {};

let state = [];

function fetchAPI() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((Response) => Response.json())
    .then((JSONData) => {
      state = JSONData;
      render();
    });
}

function render() {
  grid.innerHTML = "";
  renderCount();
  for (let person of state) {
    const newPic = document.createElement("picture");
    const newImg = document.createElement("img");
    const pName = document.createElement("h1");
    const PTitle = document.createElement("p");
    const pMutual = document.createElement("p");
    const cardDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const connectBtn = document.createElement("button");
    deleteBtn.user = person;
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("class", "deleteBtn");
    connectBtn.user = person;
    connectBtn.textContent = "Connect";
    connectBtn.setAttribute("class", "connectBtn");
    deleteBtn.addEventListener("click", deleteUser);
    connectBtn.addEventListener("click", changeState);
    newImg.setAttribute("class", "profilePic");
    cardDiv.setAttribute("class", "personDiv");
    cardDiv.style.backgroundImage = "url(" + person.backgroundImage + ")";
    newImg.src = person.picture;
    console.log(person.backgroundImage);
    pName.innerText = person.name.first + " " + person.name.last;
    PTitle.innerText = person.title;
    pMutual.innerText = person.mutualConnections + " Mutual Connections";
    cardDiv.appendChild(newPic);
    cardDiv.appendChild(pName);
    cardDiv.appendChild(PTitle);
    cardDiv.appendChild(pMutual);
    cardDiv.appendChild(deleteBtn);
    cardDiv.appendChild(connectBtn);
    newPic.appendChild(newImg);
    grid.appendChild(cardDiv);
  }
}

function deleteUser(e) {
  const currentUser = e.target.user;
  const index = state.indexOf(currentUser);
  state.splice(index, 1);
  addOneUser();
}

function addOneUser() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((Response) => Response.json())
    .then((JSONData) => {
      newUser = JSONData[0];
      state.push(newUser);
      render();
    });
}
function changeState(e) {
  const CurrentButton = e.target;
  if (CurrentButton.innerText === "Pending") {
    CurrentButton.innerText = "Connect";
    counter--;
  } else {
    CurrentButton.innerText = "Pending";
    counter++;
  }
  renderCount();
}
function renderCount() {
  pendingCount.innerText = counter;
  localStorage.setItem("counter", counter);
}
fetchAPI();
