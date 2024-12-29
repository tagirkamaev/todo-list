import AllTasks from "./AllTasks";

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
      const checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("checkbox");
      const taskCheckbox = document.createElement("input");
      taskCheckbox.setAttribute("type", "checkbox");
      taskCheckbox.setAttribute("data-task-index", index);
      taskCheckbox.checked = task.checklist;
      checkboxContainer.appendChild(taskCheckbox);

      // task content
      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = task.title;

      const taskDueDate = document.createElement("span");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = task.dueDate ? task.formatDueDate() : "";

      taskDueDate.addEventListener("click", () => {
        const newDate = prompt(
          "Enter new due date (dd-mm-yyyy):",
          task.dueDate
        );
        if (newDate) {
          AllTasks.updateTaskDueDate(index, newDate);
          task.dueDate.textContent = task.formatDueDate();
        }
      });

      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDueDate);

      // delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");

      taskCard.appendChild(checkboxContainer);
      taskCard.appendChild(taskContent);
      taskCard.appendChild(deleteButton);

      taskCard.addEventListener("click", () => {
        if (typeof onTaskSelected === "function") {
          onTaskSelected(index);
        }
      });

      taskContainer.appendChild(taskCard);

      // callback for events
      deleteButton.addEventListener("click", () => {
        if (typeof onDelete === "function") onDelete(index);
      });

      taskCheckbox.addEventListener("change", () => {
        if (typeof onToggle === "function")
          onToggle(index, taskCheckbox.checked);
      });
    });
  };

  const renderTaskDetails = (task) => {
    const detailsContainer = document.getElementById("task-details");
    detailsContainer.innerHTML = `
      <div id="details-icons">
        <span class="icon priority-icon" title="Priority"></span>
        <span class="icon checkbox-icon" title="Completion"></span>
        <span class="icon date-icon" title="Due Date"></span>
      </div>
      <h3 id="details-title" contenteditable="true">${task.title}</h3>
      <textarea
        id="details-notes"
        placeholder="Add your notes here...">${task.notes || ""}</textarea>`;

    const priorityIcon = detailsContainer.querySelector(".priority-icon");
    const checkboxIcon = detailsContainer.querySelector(".checkbox-icon");
    const dateIcon = detailsContainer.querySelector(".date-icon");

    priorityIcon.title = `Priority: ${task.priority || "None"}`;
    priorityIcon.style.backgroundColor =
      task.priority === "high"
        ? "#e74c3c"
        : task.priority === "medium"
        ? "#f1c40f"
        : "#2ecc71";

    checkboxIcon.title = task.checklist ? "Completed" : "Incomplete";
    checkboxIcon.style.backgroundColor = task.checklist ? "#2ecc71" : "#e74c3c";
    checkboxIcon.addEventListener("click", () => {
      task.checklist = !task.checklist;
      if (typeof onToggle === "function") {
        const taskIndex = task.index;
        // if (taskIndex !== -1) {
        // onToggle(taskIndex, !task.checklist);
        // }
        onToggle(taskIndex, task.checklist);
        checkboxIcon.title = task.checklist ? "Completed" : "Incomplete";
        checkboxIcon.style.backgroundColor = task.checklist
          ? "#2ecc71"
          : "#e74c3c";

        const taskCheckbox = document.querySelector(
          `[data-task-index="${task.index}"]`
        );
        if (taskCheckbox) {
          taskCheckbox.checked = task.checklist;
        }
      }
    });

    dateIcon.title = `Due: ${task.dueDate || "No due date"}`;

    const titleField = detailsContainer.querySelector("#details-title");
    titleField.addEventListener("input", () => {
      if (typeof onUpdateTitle === "function") {
        onUpdateTitle(task, titleField.textContent.trim());
      }
    });

    const notesField = detailsContainer.querySelector("#details-notes");
    if (notesField) {
      notesField.addEventListener("input", () => {
        if (typeof onUpdateNotes === "function") {
          const notesValue = notesField.value ? notesField.value.trim() : "";
          onUpdateNotes(task, notesValue);
        }
      });
    }
  };

  let onDelete = null;
  let onToggle = null;
  let onTaskSelected = null;
  let onUpdateTitle = null;
  let onUpdateNotes = null;

  const setCallbacks = (callbacks) => {
    onDelete = callbacks.onDelete;
    onToggle = callbacks.onToggle;
    onTaskSelected = callbacks.onTaskSelected;
    onUpdateNotes = callbacks.onUpdateNotes;
    onUpdateTitle = callbacks.onUpdateTitle;
  };

  return { renderTasks, renderTaskDetails, setCallbacks };
})();

export default DisplayTaskController;
