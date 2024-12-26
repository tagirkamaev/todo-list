import { format } from "date-fns";

class Task {
  constructor(
    title,
    description,
    dueDate = null,
    checklist = false,
    priority = null
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.checklist = checklist;
    this.priority = priority;
  }

  isOverdue() {
    if (!this.dueDate) return false;
    const currentDate = new Date();
    return new Date(this.dueDate) < currentDate;
  }

  formatDueDate() {
    if (!this.dueDate) return "No due date";
    return format(new Date(this.dueDate), "dd/MM/yyyy");
  }
}

// notes,

// this.notes = notes;

export default Task;
