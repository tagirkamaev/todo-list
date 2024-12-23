const DisplayTaskController = (function () {
  const renderTasks = function (tasks) {
    const taskContainer = document.getElementById("tasks");
    taskContainer.innerHTML = "";

    // display tasks
    tasks.forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("todo");

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

      const taskDescription = document.createElement("span");
      taskDescription.classList.add("task-desc");
      taskDescription.textContent = task.description;

      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDescription);

      // delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");

      taskCard.appendChild(checkbox);
      taskCard.appendChild(taskContent);
      taskCard.appendChild(deleteButton);

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

  let onDelete = null;
  let onToggle = null;

  const setCallbacks = (callbacks) => {
    onDelete = callbacks.onDelete;
    onToggle = callbacks.onToggle;
  };

  return { renderTasks, setCallbacks };
})();

export default DisplayTaskController;
