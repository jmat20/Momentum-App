let toDoItems = [];
var time = "";
var session = "AM";
const url = "https://api.quotable.io/random";
let localQuotes = [];
let userName = "";
let wallTime = "";
let splash = document.querySelector(".splash-active");
let main = document.querySelector(".main");
let hh;
let body = document.querySelector("body");

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
  hh = date.getHours();
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
  if (hh <= 3 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body3am");
  } else if (hh <= 5 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body5am");
  } else if (hh <= 6 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body6am");
  } else if (hh <= 7 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body7am");
  } else if (hh <= 8 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body8am");
  } else if (hh <= 10 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body10am");
  } else if (hh <= 11 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body11am");
  } else if (hh <= 12 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body12nn");
  } else if (hh <= 1 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body1pm");
  } else if (hh <= 3 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body3pm");
  } else if (hh <= 4 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body4pm");
  } else if (hh <= 5 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body5pm");
  } else if (hh <= 6 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body6pm");
  } else if (hh <= 7 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body7pm");
  } else if (hh <= 10 && session === "PM") {
    body.removeAttribute("class");
    body.classList.add("body10pm");
  } else if (hh <= 12 && session === "AM") {
    body.removeAttribute("class");
    body.classList.add("body12mn");
  }

  let t = setTimeout(function () {
    wallpaperSetter();
  }, 1800000);
}

displayToDos();
currentTime();
getQuote();
wallpaperSetter();
