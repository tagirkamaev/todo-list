import "./style.css";

class Task {
  constructor(
    title,
    description,
    // dueDate,
    // priority,
    // notes,
    checklist
  ) {
    this.title = title;
    this.description = description;
    // this.dueDate = dueDate;
    // this.priority = priority;
    // this.notes = notes;
    this.checklist = checklist || false;
  }
}

const AllTasks = (function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (index) => tasks.splice(index, 1);
  const getTasks = () => [...tasks];

  const startWithTestTasks = () => {
    tasks.push(new Task("Buy groceries", "Milk, bread, eggs", false));
    tasks.push(new Task("Wash dishes", "until 9 am", false));
    tasks.push(new Task("Do homework", "Math, physics", true));
  };

  return { addTask, removeTask, getTasks, startWithTestTasks };
})();

const DisplayTaskController = function () {
  const renderTasks = function () {
    const taskContainer = document.getElementById("tasks");
    taskContainer.innerHTML = "";

    // display tasks
    AllTasks.getTasks().forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("todo");

      // checkbox
      const checkbox = document.createElement("div");
      checkbox.classList.add("checkbox");
      const taskChecklist = document.createElement("input");
      taskChecklist.setAttribute("type", "checkbox");
      taskChecklist.checked = task.checklist;
      taskChecklist.addEventListener("change", () => {
        task.checklist = taskChecklist.checked;
      });
      checkbox.appendChild(taskChecklist);

      // task content
      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = task.title;

      const taskDescription = document.createElement("span");
      taskDescription.classList.add("task-desc");
      taskDescription.textContent = task.description;

      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDescription);

      // delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");
      deleteButton.addEventListener("click", () => {
        AllTasks.removeTask(index);
        renderTasks();
      });

      taskCard.appendChild(checkbox);
      taskCard.appendChild(taskContent);
      taskCard.appendChild(deleteButton);

      taskContainer.appendChild(taskCard);
    });
  };

  return { renderTasks };
};

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
