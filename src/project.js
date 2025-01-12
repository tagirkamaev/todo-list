class Project {
  constructor(name) {
    this.name = name
    this.tasks = []
  }

  addTask(task) {
    if (!this.tasks.includes(task)) {
      this.tasks.push(task)
      task.project = this
    }
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task)
    if (task.project === this) {
      task.project = null
    }
  }

  getTasks() {
    return [...this.tasks]
  }
}

export default Project
