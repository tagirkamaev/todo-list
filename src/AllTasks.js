import Task from "./task";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import isWithinInterval from "date-fns/isWithinInterval";
import addDays from "date-fns/addDays";

const AllTasks = (function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (index) => tasks.splice(index, 1);
  const updateTask = (index, updatedTask) => {
    tasks[index] = updatedTask;
  };
  const getTasks = () => [...tasks];
  const updateTaskDueDate = (index, newDueDate) => {
    if (tasks[index]) {
      tasks[index].dueDate = newDueDate;
    }
  };

  // filtering methods
  const getOverdueTasks = () => {
    const currentDate = new Date();
    return tasks.filter(
      (task) => task.dueDate && isBefore(new Date(task.dueDate), currentDate)
    );
  };
  const getTodayTasks = () => {
    return tasks.filter(
      (task) => task.dueDate && isToday(new Date(task.dueDate))
    );
  };
  const getThisWeekTasks = () => {
    const today = new Date();
    const endOfWeek = addDays(today, 7);

    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      return isWithinInterval(new Date(task.dueDate), {
        start: today,
        end: endOfWeek,
      });
    });
  };

  const startWithTestTasks = () => {
    tasks.push(new Task("Buy groceries", "Milk, bread, eggs", false));
    tasks.push(new Task("Wash dishes", "until 9 am", false));
    tasks.push(new Task("Do homework", "Math, physics", true));
  };

  return {
    addTask,
    removeTask,
    updateTask,
    getTasks,
    updateTaskDueDate,
    getOverdueTasks,
    getTodayTasks,
    getThisWeekTasks,
    startWithTestTasks,
  };
})();

export default AllTasks;
