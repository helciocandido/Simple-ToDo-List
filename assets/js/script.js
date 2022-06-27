const addBtn = document.querySelector(".add-btn");
const todosList = document.querySelector(".todos");
const inputText = document.getElementById("input-text");

let tasksToRemove;

addBtn.addEventListener("click", addTask);

function addTask(event) {
  if (event) {
    event.preventDefault();
  }
  if (inputText.value) {
    const mainContainer = document.createElement("div");
    const taskContainer = document.createElement("div");
    const removeTask = document.createElement("img");
    const label = document.createElement("label");
    const newTask = document.createElement("input");
    const span = document.createElement("span");

    span.classList.add("task-text");
    span.innerText = inputText.value;

    newTask.setAttribute("type", "checkbox");
    newTask.setAttribute("name", inputText.value);
    newTask.setAttribute("id", inputText.value);

    label.setAttribute("for", inputText.value);
    label.appendChild(span);

    taskContainer.classList.add("task-container");
    taskContainer.appendChild(newTask);
    taskContainer.appendChild(label);

    removeTask.classList.add("task-remove");
    removeTask.setAttribute("src", "./assets/img/delete.svg");

    mainContainer.appendChild(taskContainer);
    mainContainer.appendChild(removeTask);
    mainContainer.classList.add("main-container");

    todosList.appendChild(mainContainer);

    saveTasks(inputText.value);

    inputText.value = "";
    checkboxChecked();
  }

  let tasksToRemove = [...document.querySelectorAll(".task-remove")];
  tasksToRemove.forEach((item) => {
    item.addEventListener("click", () => {
      const itemName =
        item.previousElementSibling.firstChild.getAttribute("name");
      localStorage.removeItem(itemName);
      item.parentElement.remove();
      tasksToRemove = [...document.querySelectorAll(".task-remove")];
    });
  });
}

function checkboxChecked() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((item) => {
    item.addEventListener("change", (item) => {
      if (item.target.checked) {
        item.target.nextSibling.classList.add("checked-task");
      } else {
        item.target.nextSibling.classList.remove("checked-task");
      }
    });
  });
}

function saveTasks(task) {
  localStorage[task] = task;
}

function setTasks() {
  const tasks = Object.keys(localStorage);
  tasks.forEach((task) => {
    inputText.value = task;
    addTask();
  });
  console.log(tasks);
}

setTasks();
