import { format, isValid } from "date-fns";

class Task {
  constructor({
    title,
    description,
    dueDate = null,
    checklist = false,
    priority = null,
    notes = "",
  }) {
    if (!title) {
      throw new Error("Title is required field.");
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      throw new Error(`Invalid due date: ${dueDate}`);
    }

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.checklist = checklist;
    this.priority = priority;
    this.notes = notes;
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

export default Task;
