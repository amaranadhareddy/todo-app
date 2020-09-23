const task = document.querySelector(".task");
const filterTasks = document.querySelector(".filter");
const add = document.querySelector(".add");
const clear = document.querySelector(".clear");
const deleteItem = document.querySelector(".delete");
let taskList = document.querySelector(".itemList");
const defaultTask = document.querySelector(".default-task");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", defaultCheck);
  add.addEventListener("click", addTask);
  taskList.addEventListener("click", deleteTask);
  clear.addEventListener("click", clearTasks);
  filterTasks.addEventListener("keyup", filterTask);
}

function defaultCheck() {
  let tasks;
  defaultTask.style.display = "block";
  if (localStorage.getItem("task") !== null) {
    tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks.length !== 0) {
      defaultTask.style.display = "none";
    }
  } else {
    tasks = [];
  }
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function addTask(e) {
  if (task.value !== "") {
    taskList.appendChild(createTaskElement(task.value));
    addToLocalStorage(task.value);
    defaultTask.style.display = "none";
    task.value = "";
  } else {
    alert("Please enter a task!");
  }
  e.preventDefault();
}

function createTaskElement(taskValue) {
  let newTask = document.createElement("li");
  newTask.className = "item";
  newTask.innerText = taskValue;
  let link = document.createElement("a");
  link.className = "delete";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  newTask.appendChild(link);
  return newTask;
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    deleteFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function clearTasks() {
  //taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.removeItem("task");
  defaultTask.style.display = "block";
}

function filterTask(e) {
  const filterValue = e.target.value.toLowerCase();
  document.querySelectorAll(".item").forEach((item) => {
    if (item.textContent.toLowerCase().indexOf(filterValue) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function addToLocalStorage(newTask) {
  let tasks;
  if (localStorage.getItem("task") !== null) {
    tasks = JSON.parse(localStorage.getItem("task"));
  } else {
    tasks = [];
  }
  tasks.push(newTask);
  localStorage.setItem("task", JSON.stringify(tasks));
}

function deleteFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("task") !== null) {
    tasks = JSON.parse(localStorage.getItem("task"));
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i] === task.textContent) {
        tasks.splice(i, 1);
        break;
      }
    }
  } else {
    tasks = [];
  }
  localStorage.setItem("task", JSON.stringify(tasks));
  if (tasks.length === 0) {
    defaultTask.style.display = "block";
  }
}
