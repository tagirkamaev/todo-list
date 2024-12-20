import "./style.css";

class Task {
  constructor(
    title,
    description,
    // dueDate,
    // priority,
    // notes,
    checklist
  ) {
    this.title = title;
    this.description = description;
    // this.dueDate = dueDate;
    // this.priority = priority;
    // this.notes = notes;
    this.checklist = checklist;
  }
}

const AllTasks = function () {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.splice(index, 1);
  const getTasks = () => [...tasks];

  return { addTask, removeTask, getTasks };
};
