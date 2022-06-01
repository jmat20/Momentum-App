let toDoItems = [];
var time = "";
var session = "AM";
const url = "https://api.quotable.io/random";
let localQuotes = [];
let userName = "";
let wallTime = "";
let splash = document.querySelector(".splash-active");
let main = document.querySelector(".main");

class ToDo {
  constructor(string) {
    this.description = string;
    this.complete = false;
  }
  completeToDo() {
    this.complete = true;
  }
}

function buildToDo(todo, index) {
  var toDoShell = document.createElement("div");
  toDoShell.className = "toDoShell";
  var toDoText = document.createElement("span");
  toDoText.innerHTML = todo.description;
  var check = document.createElement("INPUT");
  check.setAttribute("type", "checkbox");
  check.id = index;
  check.addEventListener("click", function (event) {
    completeToDo(event);
  });
  check.className = "completeCheckbox";
  if (todo.complete === true) {
    check.checked = true;
    toDoText.className = "completeText";
  }
  toDoShell.append(toDoText);
  toDoShell.append(check);
  return toDoShell;
}

function buildToDos(toDos) {
  var x = toDos.map(buildToDo);
  return x;
}

function displayToDos() {
  var toDoContainer = document.querySelector("#toDoContainer");
  toDoContainer.innerHTML = "";
  let y = buildToDos(toDoItems);
  for (i = 0; i < y.length; i++) {
    toDoContainer.appendChild(y[i]);
  }
}

function addToDo() {
  var newToDo = document.querySelector("#toDoInput").value;
  var item = new ToDo(newToDo);
  toDoItems.push(item);
  document.querySelector("#toDoInput").value = "";
  displayToDos();
}

document.getElementById("addButton").addEventListener("click", function () {
  addToDo();
});

function completeToDo(event) {
  const index = event.target.id;
  toDoItems[index].completeToDo();
  displayToDos();
}

function currentTime() {
  let date = new Date();
  var hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  time = hh + ":" + mm + " " + session;
  if (hh > 6 && hh !== 12 && session === "AM") {
    wallTime = "morning";
  } else if (hh < 6 && session === "PM") {
    wallTime = "afternoon";
  } else {
    wallTime = "evening";
  }

  document.getElementById("clock").innerText = time;
  document.getElementById("clock2").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

function getName() {
  userName = document.querySelector("#nameInput").value;
  if (userName === "") {
    return;
  }
  let greeting = document.querySelector("#greeting");
  timeTag = session === "AM" ? "morning" : "evening";
  greeting.innerText = "Good " + timeTag + ", " + userName;
  splash.classList.remove("splash-active");
  splash.classList.add("splash");
  main.classList.toggle("hidden");
}

document.getElementById("addName").addEventListener("click", function () {
  getName();
});

async function getQuote() {
  let quote = document.getElementById("quote");
  let author = document.getElementById("author");
  quote.innerText = "";
  author.innerText = "";
  if (localQuotes.length < 1) {
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        quote.innerText = item.content;
        author.innerText = "- " + item.author;
      });
  } else if (localQuotes.length > 0) {
    let check1 = Math.floor(Math.random() * 2);
    if (check1 === 0) {
      fetch(url)
        .then((data) => data.json())
        .then((item) => {
          quote.innerText = item.content;
          author.innerText = "- " + item.author;
        });
    } else {
      let check2 = Math.floor(Math.random() * localQuotes.length);
      quote.innerText = localQuotes[check2];
      if (userName !== "") {
        author.innerText = "- " + userName;
      } else {
        author.innerText = "- Unknown";
      }
    }
  }
}

document.getElementById("newQuote").addEventListener("click", function () {
  getQuote();
});

function addQuote() {
  let newQuote = document.querySelector("#quoteInput");
  newQuote.classList.toggle("hidden");
  if (newQuote.value === "") {
    return;
  }
  localQuotes.push(newQuote.value);
  getQuote();
}

document.getElementById("addQuote").addEventListener("click", function () {
  addQuote();
  document.querySelector("#quoteInput").value = "";
});

function focusDisplay() {
  let newFocus = document.getElementById("focusInput");
  newFocus.classList.toggle("hidden");
  if (newFocus.value === "") {
    return;
  }
  let currentFocus = document.getElementById("focus");
  currentFocus.innerText = newFocus.value;
  newFocus.value = "";
}

function removeFocus() {
  document.getElementById("focus").innerText = "Goal For Today";
  document.getElementById("focusInput").classList.toggle("hidden");
}

document.getElementById("addFocus").addEventListener("click", function () {
  focusDisplay();
});

document.getElementById("reFocus").addEventListener("click", function () {
  removeFocus();
});

function wallpaperSetter() {
  let body = document.querySelector("body");
  if (wallTime === "morning") {
    body.classList.add("body1");
    body.classList.remove("body2");
    body.classList.remove("body3");
  } else if (wallTime === "afternoon") {
    body.classList.remove("body1");
    body.classList.add("body2");
    body.classList.remove("body3");
  } else if (wallTime === "evening") {
    body.classList.remove("body1");
    body.classList.remove("body2");
    body.classList.add("body3");
  }
  let t = setTimeout(function () {
    wallpaperSetter();
  }, 1800000);
}

displayToDos();
currentTime();
getQuote();
wallpaperSetter();
