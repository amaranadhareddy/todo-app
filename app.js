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
  if (document.querySelector(".itemList").firstElementChild !== null) {
    defaultTask.style.display = "none";
  } else {
    defaultTask.style.display = "block";
  }
}

function addTask(e) {
  if (task.value !== "") {
    console.log(task.value);
    let newTask = document.createElement("li");
    newTask.className = "item";
    newTask.innerText = task.value;
    let link = document.createElement("a");
    link.className = "delete";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    newTask.appendChild(link);
    taskList.appendChild(newTask);
    task.value = "";
  } else {
    alert("Please enter a task!");
  }
  e.preventDefault();
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    defaultCheck();
  }
}

function clearTasks() {
  //taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
