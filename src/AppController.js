import AllProjects from './AllProjects'
import AllTasks from './AllTasks'
import DisplayProjectsController from './DisplayProjectsController'
import DisplayTaskController from './DisplayTaskController'
import Task from './task'
import Project from './project'
import AddTaskController from './AddTaskController'
import sectionTitleController from './SectionTitle'

const AppController = (function () {
  const saveToLocalStorage = () => {
    const tasks = AllTasks.getTasks()
    const projects = AllProjects.getProjects()
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  const loadFromLocalStorage = () => {
    const tasksData = JSON.parse(localStorage.getItem('tasks')) || []
    const projectsData = JSON.parse(localStorage.getItem('projects')) || []

    if (projectsData.length === 0) {
      AllProjects.startWithTestProjects()
      saveToLocalStorage()
    } else {
      projectsData.forEach((project) => {
        const restoredProject = new Project(project.name)
        AllProjects.addProject(restoredProject)
      })
    }

    if (tasksData.length === 0) {
      AllTasks.startWithTestTasks()
      saveToLocalStorage()
    } else {
      tasksData.forEach((task) => {
        const project = AllProjects.getProjectByName(task.project)
        const restoredTask = new Task({
          title: task.title,
          project: project,
          dueDate: task.dueDate,
          checklist: task.checklist,
          priority: task.priority,
          notes: task.notes,
        })
        AllTasks.addTask(restoredTask)
      })
    }
  }

  const initialize = () => {
    loadFromLocalStorage()

    // callbacks for display and logic interaction
    DisplayTaskController.setCallbacks({
      onDelete: handleDeleteTask,
      onToggle: handleToggleTask,
      onTaskSelected: handleTaskSelected,
      onUpdateTitle: handleUpdateTitle,
      onUpdateNotes: handleUpdateNotes,
      onUpdateDate: handleUpdateDate,
      onUpdatePriority: handleUpdatePriority,
    })

    DisplayProjectsController.setCallbacksProjects({
      onProjectSelected: handleProjectSelected,
    })

    AddTaskController.setupEventListeners((title, dueDate, priority) => {
      handleAddTask(title, dueDate, priority)
    })
    setupEventListeners()

    updateUI()

    updateUISidebar()
  }

  const handleAddTask = (title, dueDate, priority, projectName = null) => {
    // let project = null

    // if (projectName) {
    //   project = AllProjects.getOrCreateProject(projectName)
    // } else {
    //   project = AllProjects.getDefaultProject()
    // }

    const project = projectName
      ? AllProjects.getOrCreateProject(projectName)
      : AllProjects.getDefaultProject()

    const newTask = new Task({
      title: title,
      project: project.name,
      dueDate: dueDate || null,
      checklist: false,
      priority: priority || null,
      notes: '',
    })

    AllTasks.addTask(newTask)
    saveToLocalStorage()
    updateUI()
  }

  const handleAddProject = (name) => {
    const newProject = {
      name,
    }
    AllProjects.addProject(newProject)
    saveToLocalStorage()
    updateUISidebar()
  }

  const handleDeleteTask = (index) => {
    const tasks = AllTasks.getTasks()

    // handling active task
    const taskToDelete = tasks[index]
    const detailsContainer = document.getElementById('task-details')
    if (taskToDelete) {
      detailsContainer.innerHTML = '<p>Select a task to view details</p>'
    }

    AllTasks.removeTask(index)
    saveToLocalStorage()
    updateUI()
  }

  const handleToggleTask = (index, isChecked) => {
    AllTasks.updateTaskChecklist(index, isChecked)
    saveToLocalStorage()
    updateUI()
    handleTaskSelected(index)
  }

  const handleTaskSelected = (index) => {
    const tasks = AllTasks.getTasks()
    const task = tasks[index]

    if (!task) {
      console.error(`Task at index ${index} does not exist`)
      const detailsContainer = document.getElementById('task-details')
      detailsContainer.innerHTML = '<p>Select a task to view details</p>'
      return
    }

    DisplayTaskController.renderTaskDetails(task, index)
  }

  const handleUpdateTitle = (index, newTitle) => {
    const tasks = AllTasks.getTasks()
    tasks[index].title = newTitle
    saveToLocalStorage()
    updateUI()
  }

  const handleUpdateNotes = (index, newNotes) => {
    const tasks = AllTasks.getTasks()
    tasks[index].notes = newNotes
    saveToLocalStorage()
    updateUI()
  }

  const handleUpdatePriority = (index, newPriority) => {
    const tasks = AllTasks.getTasks()
    tasks[index].priority = newPriority
    saveToLocalStorage()
    updateUI()
    handleTaskSelected(index)
  }

  const handleUpdateDate = (index, newDate) => {
    AllTasks.updateTaskDueDate(index, newDate)
    saveToLocalStorage()
    updateUI()
    handleTaskSelected(index)
  }

  const updateUI = () => {
    const tasks = AllTasks.getTasks()
    DisplayTaskController.renderTasks(tasks)
  }

  const updateUISidebar = () => {
    const projects = AllProjects.getProjects()
    DisplayProjectsController.renderProjects(projects)
  }

  const setupEventListeners = () => {
    const newProjectButton = document.getElementById('add-project')
    const addProjectDialog = document.getElementById('add-project-dialog')
    const confirmAddProjectButton = document.getElementById(
      'confirm-add-project',
    )

    newProjectButton.addEventListener('click', () => {
      addProjectDialog.showModal()
    })

    confirmAddProjectButton.addEventListener('click', () => {
      const name = document.getElementById('project-name').value

      if (name) {
        handleAddProject(name)
      }

      addProjectDialog.close()
    })

    // filter buttons in menu
    const overdueSectionName = document.querySelector('[data-filter="overdue"]')
    overdueSectionName.addEventListener('click', () => {
      const overdueTasks = AllTasks.getOverdueTasks()
      sectionTitleController.updateSectionTitle(
        document.getElementById('overdue').innerHTML,
      )
      DisplayTaskController.renderTasks(overdueTasks)
    })

    const todaySectionName = document.querySelector('[data-filter="today"]')
    todaySectionName.addEventListener('click', () => {
      const todayTasks = AllTasks.getTodayTasks()
      sectionTitleController.updateSectionTitle(
        document.getElementById('today').innerHTML,
      )
      DisplayTaskController.renderTasks(todayTasks)
    })

    const weekSectionTitle = document.querySelector('[data-filter="week"]')
    weekSectionTitle.addEventListener('click', () => {
      const weekTasks = AllTasks.getThisWeekTasks()
      sectionTitleController.updateSectionTitle(
        document.getElementById('week').innerHTML,
      )
      DisplayTaskController.renderTasks(weekTasks)
    })

    const inbox = document.getElementById('default')
    inbox.addEventListener('click', () => {
      sectionTitleController.updateSectionTitle(
        document.getElementById('default').innerHTML,
      )
      updateUI()
    })
  }

  const handleProjectSelected = (project) => {
    sectionTitleController.updateSectionTitle(project.name)
    DisplayTaskController.renderTasksForProject(project)
  }

  return { initialize }
})()

export default AppController
