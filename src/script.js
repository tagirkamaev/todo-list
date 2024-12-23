import "./style.css";
import AllTasks from "./AllTasks";
import DisplayTaskController from "./DisplayTaskController";
import Task from "./task";

// Add event listener for add task button
const newTaskButton = document.getElementById("add-task");
const addTaskDialog = document.getElementById("add-task-dialog");
const confirmAddButton = document.getElementById("confirm-add");

newTaskButton.addEventListener("click", () => {
  addTaskDialog.showModal();
});

confirmAddButton.addEventListener("click", () => {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;

  if (title && description) {
    const addingNewTask = new Task(title, description, false);
    AllTasks.addTask(addingNewTask);
    const taskController = DisplayTaskController();
    taskController.renderTasks();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  AllTasks.startWithTestTasks();
  const taskController = DisplayTaskController();
  taskController.renderTasks();
});
