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
      taskCard.classList.add("task-card");

      const taskTitle = document.createElement("h2");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = task.title;

      const taskDescription = document.createElement("p");
      taskDescription.classList.add("task-description");
      taskDescription.textContent = task.description;

      const taskChecklist = document.createElement("input");
      taskChecklist.setAttribute("type", "checkbox");
      taskChecklist.checked = task.checklist;
      taskChecklist.addEventListener("change", () => {
        task.checklist = taskChecklist.checked;
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");
      deleteButton.addEventListener("click", () => {
        AllTasks.removeTask(index);
        renderTasks();
      });

      taskCard.appendChild(taskTitle);
      taskCard.appendChild(taskDescription);
      taskCard.appendChild(taskChecklist);
      taskCard.appendChild(deleteButton);

      taskContainer.appendChild(taskCard);
    });
  };

  return { renderTasks };
};

document.addEventListener("DOMContentLoaded", () => {
  AllTasks.startWithTestTasks();
  const taskController = DisplayTaskController();
  taskController.renderTasks();
});
