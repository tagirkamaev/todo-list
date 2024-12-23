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

  const handleAddTask = (title, description) => {
    const newTask = { title, description, checklist: false };
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

      if (title && description) {
        handleAddTask(title, description);
      }

      addTaskDialog.close();
    });
  };

  return { initialize };
})();

export default AppController;
