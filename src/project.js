class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask() {
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  getTasks() {
    return [...this.tasks];
  }
}

export default Project;
