import AllTasks from "./AllTasks";
import DisplayTaskController from "./DisplayTaskController";

const AppController = (function () {
  const initialize = () => {
    AllTasks.startWithTestTasks();
    DisplayTaskController.setCallbacks({
      onDelete: handleDeleteTask,
      onToggle: handleToggleTask,
    });
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

  return { initialize };
})();

export default AppController;
