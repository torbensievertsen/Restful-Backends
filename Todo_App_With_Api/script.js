"use strict";
const API = "http://localhost:4730/todos";
let todos = [];
const btnAdd = document.querySelector("#btn-add");
const ul = document.querySelector("#todo-list");
const filter = document.querySelector("#filter");
const all = document.querySelector("#all");
const open = document.querySelector("#open");
const done = document.querySelector("#done");
const remove = document.querySelector("#btn-remove");
let filtername = "all";
btnAdd.addEventListener("click", addTodo);
filter.addEventListener("change", changeFilter);
remove.addEventListener("click", removeDoneToDoes);

loadTodosFromApi();

function loadTodosFromApi() {
  fetch(API)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .then((todosfromApi) => {
      todos = todosfromApi;
      renderTodos();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function addTodo(event) {
  event.preventDefault();
  const inputText = document.querySelector("#input");
  for (let todo of todos) {
    if (inputText.value.trim() === "") {
      inputText.value = "";
      return;
    }
    if (inputText.value.toUpperCase() === todo.description.toUpperCase()) {
      console.log("error");
      inputText.value = "";
      inputText.placeholder = "idiot das hast du schon";
      return;
    }
  }
  const newTodo = { description: inputText.value, done: false };
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    })
    .catch((error) => {
      alert(error.message);
    });
  inputText.value = "";
}

function renderTodos() {
  ul.innerText = "";
  todos.forEach((element) => {
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = element.done;
    check.todo = element;
    const newli = document.createElement("li");
    newli.id = element.id;
    const txt = document.createTextNode(element.description);
    if (element.done) {
      newli.style = "text-decoration:line-through;";
    }
    newli.append(txt, check);
    ul.appendChild(newli);

    check.addEventListener("change", updateTodos);

    if (filtername === "all") {
      newli.hidden = false;
    } else if (filtername === "open") {
      newli.hidden = element.done;
    } else {
      newli.hidden = !element.done;
    }
  });
}

function updateTodos(event) {
  event.target.todo.done = !event.target.todo.done;
  const updatedTodo = event.target.todo;
  fetch(API + "/" + event.target.todo.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .then((updatedTodoFromApi) => {
      renderTodos();
    })
    .catch((error) => {
      alert(error.message);
    });
}

function changeFilter(event) {
  if (event.target === all) {
    filtername = "all";
  }
  if (event.target === open) {
    filtername = "open";
  }
  if (event.target === done) {
    filtername = "done";
  }
  renderTodos();
}

function removeDoneToDoes() {
  const deleteids = [];
  for (const todo of todos) {
    if (todo.done === true) {
      deleteids.push(removeformApi(todo.id));
    }
  }
  Promise.all(deleteids).then((values) => {
    if (values.indexOf(undefined) !== -1) {
      console.log("tset");
      loadTodosFromApi();
    }
  });
}

function removeformApi(id) {
  return fetch(API + "/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .then(() => {})
    .catch((error) => {
      alert(error.message);
    });
}
