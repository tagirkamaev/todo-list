class Project {
  constructor(name, isSystem = null) {
    this.name = name
    this.isSystem = isSystem
    this.tasks = []
  }
}

export default Project
