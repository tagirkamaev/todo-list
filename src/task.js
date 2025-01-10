import AllProjects from './AllProjects'

class Task {
  constructor({
    title,
    project = null,
    dueDate = null,
    checklist = false,
    priority = null,
    notes = '',
  }) {
    if (!title) {
      throw new Error('Title is required field.')
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      throw new Error(`Invalid due date: ${dueDate}`)
    }

    if (project) {
      if (typeof project === 'string') {
        this.project = AllProjects.getOrCreateProject(project)
      } else {
        this.project = project
      }
    } else {
      this.project = AllProjects.getDefaultProject()
    }

    this.title = title
    this.dueDate = dueDate
    this.checklist = checklist
    this.priority = priority
    this.notes = notes
  }

  isOverdue() {
    if (!this.dueDate) return false
    const currentDate = new Date()
    return new Date(this.dueDate) < currentDate
  }
}

export default Task
