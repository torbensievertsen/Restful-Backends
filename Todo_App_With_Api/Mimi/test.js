let todosArr = [];
let count = 0;
let filter = "all";
const newToDoInput = document.querySelector("#inputField");
const rmvBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", deleteTodo);
const radioBtn = document.querySelector("#radioBtn");
radioBtn.addEventListener("change", useFilter);

const open = document.querySelector("#openFilter");
const done = document.querySelector("#doneFilter");
const all = document.querySelector("#allFilter");
const addBtn = document.querySelector("#addTodo");
addBtn.addEventListener("click", addToDo);
getTodos();

function addToDo(event) {
  event.preventDefault();
  const newToDoText = newToDoInput.value;
  const newToDo = {
    description: newToDoText,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newToDo),
  })
    .then((res) => res.json())
    .then((newToDoFromApi) => {
      todosArr.push(newToDoFromApi);
      renderToDos();
    });
}

if (checkDuplis()) {
  todosArr.push({
    description: newToDoInput.value,
    done: false,
    id: createID("id_"),
  });
  newToDoInput.value = "";
}

function getTodos() {
  fetch("http://localhost:4730/todos")
    .then((response) => response.json())
    .then((jsonData) => {
      todosArr = jsonData;
      renderToDos();
    });
}

function renderToDos() {
  const toDoList = document.querySelector("#toDoList");
  toDoList.innerHTML = "";
  todosArr.forEach((ObjOfArr) => {
    const ListElement = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = ObjOfArr.done;
    checkbox.Obj = ObjOfArr;

    if (ObjOfArr.done) {
      ListElement.style = "text-decoration: line-through;";
    }

    if (filter === "all") {
      ListElement.hidden = false;
    } else if (filter === "open") {
      ListElement.hidden = ObjOfArr.done;
    } else if (filter === "done") {
      ListElement.hidden = !ObjOfArr.done;
    }

    checkbox.addEventListener("change", doneTask);
    const description = document.createTextNode(ObjOfArr.description);
    ListElement.appendChild(checkbox);
    ListElement.appendChild(description);
    toDoList.appendChild(ListElement);
  });
}

function doneTask(event) {
  if (event.target.checked === true) {
    event.target.Obj.done = true;

    event.target.parentElement.style = "text-decoration: line-through;";
  } else {
    event.target.parentElement.style = "text-decoration: none;";
    event.target.Obj.done = false;
  }
}

function createID(text) {
  return (
    text.replaceAll(" ", "").toLowerCase() + Math.floor(Math.random() * 100000)
  );
}

function checkDuplis() {
  for (let duplis of todosArr) {
    if (newToDo.value.toLowerCase() === duplis.description.toLowerCase()) {
      alert("Wenn schon da, dann nix dazu!");
      return false;
    }
  }
  return true;
}

function useFilter(event) {
  if (event.target === open) {
    filter = "open";
  } else if (event.target === done) {
    filter = "done";
  } else if (event.target === all) {
    filter = "all";
  }
  renderToDos();
}

function deleteTodo() {
  todosArr = todosArr.filter((todoitem) => !todoitem.done);
  renderToDos();
}
