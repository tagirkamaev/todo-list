import Task from "./task";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import isWithinInterval from "date-fns/isWithinInterval";
import addDays from "date-fns/addDays";

const AllTasks = (function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);

  const removeTask = (index) => tasks.splice(index, 1);

  const getTasks = () => [...tasks];

  const updateTask = (index, updatedTask) => {
    tasks[index] = updatedTask;
  };

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
    const today = new Date();
    const todayFormatted = format(today, "dd-MM-yyyy");

    tasks.push(
      new Task({
        title: "Buy groceries",
        description: "Milk, bread, eggs",
        checklist: false,
        priority: "low",
      })
    );
    tasks.push(
      new Task({
        title: "Wash dishes",
        dueDate: todayFormatted,
        checklist: false,
        priority: "medium",
        notes: "My mom asked me to do this",
      })
    );
    tasks.push(
      new Task({
        title: "Do homework",
        notes: "Math, physics",
        checklist: true,
        priority: "high",
      })
    );
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
