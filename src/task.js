class Task {
  constructor(title, description, dueDate = null, checklist = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.checklist = checklist;
  }

  isOverdue() {
    if (!this.dueDate) return false;
    const currentDate = new Date();
    return new Date(this.dueDate) < currentDate;
  }
}

// priority,
// notes,

// this.priority = priority;
// this.notes = notes;

export default Task;
