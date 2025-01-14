class Project {
  constructor(name, isSystem = false) {
    this.name = name
    this.isSystem = isSystem
    this.tasks = []
  }
}

export default Project
