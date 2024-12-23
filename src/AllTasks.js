import Task from "./task";

const AllTasks = (function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (index) => tasks.splice(index, 1);
  const getTasks = () => [...tasks];

  const startWithTestTasks = () => {
    tasks.push(new Task("Buy groceries", "Milk, bread, eggs", false));
    tasks.push(new Task("Wash dishes", "until 9 am", false));
    tasks.push(new Task("Do homework", "Math, physics", true));
  };

  return { addTask, removeTask, getTasks, startWithTestTasks };
})();

export default AllTasks;
