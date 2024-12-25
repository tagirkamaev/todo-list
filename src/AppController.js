import AllTasks from "./AllTasks";
import DisplayTaskController from "./DisplayTaskController";

const AppController = (function () {
  const initialize = () => {
    // rendering example tasks
    AllTasks.startWithTestTasks();

    // callbacks for display and logic interaction
    DisplayTaskController.setCallbacks({
      onDelete: handleDeleteTask,
      onToggle: handleToggleTask,
    });

    setupEventListeners();

    updateUI();
  };

  const handleAddTask = (title, description, dueDate) => {
    const validDueDate = dueDate ? new Date(dueDate) : null;
    const newTask = {
      title,
      description,
      dueDate: validDueDate,
      checklist: false,
    };
    AllTasks.addTask(newTask);
    updateUI();
  };

  const handleDeleteTask = (index) => {
    AllTasks.removeTask(index);
    updateUI();
  };

  const handleToggleTask = (index, isChecked) => {
    const tasks = AllTasks.getTasks();
    const updatedTask = { ...tasks[index], checklist: isChecked };
    AllTasks.updateTask(index, updatedTask);
    updateUI();
  };

  const updateUI = () => {
    const tasks = AllTasks.getTasks();
    DisplayTaskController.renderTasks(tasks);
  };

  const setupEventListeners = () => {
    const newTaskButton = document.getElementById("add-task");
    const addTaskDialog = document.getElementById("add-task-dialog");
    const confirmAddButton = document.getElementById("confirm-add");

    newTaskButton.addEventListener("click", () => {
      addTaskDialog.showModal();
    });

    confirmAddButton.addEventListener("click", () => {
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-desc").value;
      const dueDate = document.getElementById("due-date").value;

      if (dueDate && new Date(dueDate) < new Date()) {
        alert("Due date cannot be in the past");
        return;
      }

      if (title && description) {
        handleAddTask(title, description, dueDate);
      }

      addTaskDialog.close();
    });

    // filter buttons in menu
    document
      .querySelector('[data-filter="overdue"]')
      .addEventListener("click", () => {
        const overdueTasks = AllTasks.getOverdueTasks();
        DisplayTaskController.renderTasks(overdueTasks);
      });

    document
      .querySelector('[data-filter="today"]')
      .addEventListener("click", () => {
        const todayTasks = AllTasks.getTodayTasks();
        DisplayTaskController.renderTasks(todayTasks);
      });

    document
      .querySelector('[data-filter="week"]')
      .addEventListener("click", () => {
        const weekTasks = AllTasks.getThisWeekTasks();
        DisplayTaskController.renderTasks(weekTasks);
      });
  };

  return { initialize };
})();

export default AppController;
