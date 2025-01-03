import AllProjects from "./AllProjects";
import AllTasks from "./AllTasks";
import DisplayProjectsController from "./DisplayProjectsController";
import DisplayTaskController from "./DisplayTaskController";
import Task from "./task";

const AppController = (function () {
  const saveToLocalStorage = () => {
    const tasks = AllTasks.getTasks();
    const projects = AllProjects.getProjects();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const loadFromLocalStorage = () => {
    const tasksData = JSON.parse(localStorage.getItem("tasks")) || [];
    const projectsData = JSON.parse(localStorage.getItem("projects")) || [];

    if (tasksData.length === 0) {
      AllTasks.startWithTestTasks();
      saveToLocalStorage();
    } else {
      tasksData.forEach((task) => {
        const restoredTask = new Task({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          checklist: task.checklist,
          priority: task.priority,
          notes: task.notes,
        });
        AllTasks.addTask(restoredTask);
      });
    }
    projectsData.forEach((project) => {
      AllProjects.addProject(project);
    });
  };

  const initialize = () => {
    loadFromLocalStorage();

    // callbacks for display and logic interaction
    DisplayTaskController.setCallbacks({
      onDelete: handleDeleteTask,
      onToggle: handleToggleTask,
      onTaskSelected: handleTaskSelected,
      onUpdateTitle: handleUpdateTitle,
      onUpdateNotes: handleUpdateNotes,
      onUpdateDate: handleUpdateDate,
    });

    setupEventListeners();

    updateUI();
  };

  const handleAddTask = (title, description, dueDate, priority) => {
    const newTask = new Task(title, description, dueDate, false, priority, "");
    AllTasks.addTask(newTask);
    saveToLocalStorage();
    updateUI();
  };

  const handleAddProject = (name) => {
    const newProject = {
      name,
    };
    AllProjects.addProject(newProject);
    saveToLocalStorage();
    updateUISidebar();
  };

  const handleDeleteTask = (index) => {
    AllTasks.removeTask(index);
    saveToLocalStorage();
    updateUI();
  };

  const handleToggleTask = (index, isChecked) => {
    AllTasks.updateTaskChecklist(index, isChecked);
    saveToLocalStorage();
    // DisplayTaskController.renderTaskDetails(updatedTask);
    updateUI();
  };

  const handleTaskSelected = (index) => {
    const task = AllTasks.getTasks()[index];
    DisplayTaskController.renderTaskDetails(task);
  };

  const handleUpdateTitle = (index, newTitle) => {
    const tasks = AllTasks.getTasks();
    tasks[index].title = newTitle;
    saveToLocalStorage();
    updateUI;
  };

  const handleUpdateNotes = (index, newNotes) => {
    const tasks = AllTasks.getTasks();
    tasks[index].notes = newNotes;
    saveToLocalStorage();
    updateUI();
  };

  const handleUpdateDate = (index, newDate) => {
    const tasks = AllTasks.getTasks();
    tasks[index].dueDate = newDate;
    saveToLocalStorage();
    updateUI();
  };

  const updateUI = () => {
    const tasks = AllTasks.getTasks();
    DisplayTaskController.renderTasks(tasks);
  };

  const updateUISidebar = () => {
    const projects = AllProjects.getProjects();
    DisplayProjectsController.renderProjects(projects);
  };

  const setupEventListeners = () => {
    const newTaskButton = document.getElementById("add-task");
    const addTaskDialog = document.getElementById("add-task-dialog");
    const confirmAddButton = document.getElementById("confirm-add");

    newTaskButton.addEventListener("click", () => {
      addTaskDialog.showModal();
    });

    confirmAddButton.addEventListener("click", () => {
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-desc").value;
      const dueDate = document.getElementById("due-date").value;
      const priority = document.getElementById("task-priority").value;

      if (dueDate && isNaN(new Date(dueDate).getTime())) {
        alert("Due date cannot be in the past");
        return;
      }

      if (title && description) {
        handleAddTask(title, description, dueDate, priority);
      }

      addTaskDialog.close();
    });

    const newProjectButton = document.getElementById("add-project");
    const addProjectDialog = document.getElementById("add-project-dialog");
    const confirmAddProjectButton = document.getElementById(
      "confirm-add-project"
    );

    newProjectButton.addEventListener("click", () => {
      addProjectDialog.showModal();
    });

    confirmAddProjectButton.addEventListener("click", () => {
      const name = document.getElementById("project-name").value;

      if (name) {
        handleAddProject(name);
      }

      addProjectDialog.close();
    });

    // filter buttons in menu
    document
      .querySelector('[data-filter="overdue"]')
      .addEventListener("click", () => {
        const overdueTasks = AllTasks.getOverdueTasks();
        DisplayTaskController.renderTasks(overdueTasks);
      });

    document
      .querySelector('[data-filter="today"]')
      .addEventListener("click", () => {
        const todayTasks = AllTasks.getTodayTasks();
        DisplayTaskController.renderTasks(todayTasks);
      });

    document
      .querySelector('[data-filter="week"]')
      .addEventListener("click", () => {
        const weekTasks = AllTasks.getThisWeekTasks();
        DisplayTaskController.renderTasks(weekTasks);
      });

    const defaultMenu = document.getElementById("default");
    defaultMenu.addEventListener("click", () => {
      updateUI();
    });
  };

  return { initialize };
})();

export default AppController;
