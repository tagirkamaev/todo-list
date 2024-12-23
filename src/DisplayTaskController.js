import AllTasks from "./AllTasks";

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

export default DisplayTaskController;
