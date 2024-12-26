const DisplayTaskController = (function () {
  const renderTasks = function (tasks) {
    const taskContainer = document.getElementById("tasks");
    taskContainer.innerHTML = "";

    // display tasks
    tasks.forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("todo");

      // attaching class depending on priority
      if (task.priority === "high") {
        taskCard.classList.add("priority-high");
      } else if (task.priority === "medium") {
        taskCard.classList.add("priority-medium");
      } else if (task.priority === "low") {
        taskCard.classList.add("priority-low");
      }

      // checkbox
      const checkbox = document.createElement("div");
      checkbox.classList.add("checkbox");
      const taskChecklist = document.createElement("input");
      taskChecklist.setAttribute("type", "checkbox");
      taskChecklist.checked = task.checklist;
      checkbox.appendChild(taskChecklist);

      // task content
      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = task.title;

      const taskDueDate = document.createElement("span");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = task.formatDueDate();

      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDueDate);

      // delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");

      taskCard.appendChild(checkbox);
      taskCard.appendChild(taskContent);
      taskCard.appendChild(deleteButton);

      taskCard.addEventListener("click", () => {
        showTaskDetails(task);
      });

      taskContainer.appendChild(taskCard);

      // callback for events
      deleteButton.addEventListener("click", () => {
        if (typeof onDelete === "function") onDelete(index);
      });

      taskChecklist.addEventListener("change", () => {
        if (typeof onToggle === "function")
          onToggle(index, taskChecklist.checked);
      });
    });
  };

  const showTaskDetails = (task) => {
    const detailsContainer = document.getElementById("details-content");
    detailsContainer.innerHTML = `
      <h5>${task.title}</h5>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate ? task.dueDate : "No due date"}</p>
      <p>Status: ${task.checklist ? "Completed" : "Incomplete"}</p>
      `;
  };

  let onDelete = null;
  let onToggle = null;

  const setCallbacks = (callbacks) => {
    onDelete = callbacks.onDelete;
    onToggle = callbacks.onToggle;
  };

  return { renderTasks, setCallbacks };
})();

export default DisplayTaskController;
