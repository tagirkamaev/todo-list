import { format, isValid } from "date-fns";

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
    const parsedDate = new Date(this.dueDate);

    if (!isValid(parsedDate)) {
      console.error(`Invalid date: ${this.dueDate}`);
    }
    return format(parsedDate, "dd/MM/yyyy");
  }
}

// notes,

// this.notes = notes;

export default Task;
