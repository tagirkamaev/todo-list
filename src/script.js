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
    this.checklist = checklist;
  }
}

const AllTasks = function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.splice(index, 1);
  const getTasks = () => [...tasks];

  return { addTask, removeTask, getTasks };
};

const DisplayTaskController = function () {
  const renderTasks = function () {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    // display tasks
    AllTasks.getTasks().forEach((task) => {
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

      taskCard.appendChild(taskTitle);
      taskCard.appendChild(taskDescription);
      taskCard.appendChild(taskChecklist);

      taskContainer.appendChild(taskCard);
    });
  };

  return { renderTasks };
};

const showTest = DisplayTaskController.renderTasks();
showTest();
