import 'flatpickr/dist/flatpickr.min.css'
import AllTasks from './AllTasks'
import AllProjects from './AllProjects'

const AddTaskController = (function () {
  const taskInput = document.getElementById('task-input')
  const taskOptions = document.getElementById('task-options')
  const taskDateIcon = document.getElementById('task-date-icon')
  const taskOptionsIcon = document.getElementById('task-more-options-button')
  const optionsContainer = document.getElementById('options-container')
  const taskPriority = document.getElementById('task-priority')
  const taskProject = document.getElementById('task-project')

  const setupEventListeners = (onTaskAdd) => {
    // showing icons after clicking input
    taskInput.addEventListener('focus', () => {
      taskOptions.classList.remove('hidden')
    })

    // concealing additional elements
    document.addEventListener('click', (event) => {
      if (
        !taskOptions.contains(event.target) &&
        !optionsContainer.contains(event.target) &&
        event.target !== taskInput &&
        event.target !== taskOptionsIcon
      ) {
        taskOptions.classList.add('hidden')
        optionsContainer.classList.add('hidden')
      }
    })

    // adding task after enter
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && taskInput.value.trim() != '') {
        const title = taskInput.value.trim()
        const priority = taskPriority.value
        const dueDate = taskInput.dataset.dueDate || null
        const project = taskProject.value

        onTaskAdd(title, dueDate, priority, project)

        taskInput.value = ''
        taskOptions.classList.add('hidden')
        optionsContainer.classList.add('hidden')
      }
    })

    // date pick
    taskDateIcon.addEventListener('focus', () => {
      const dateInput = document.createElement('input')
      dateInput.type = 'text'
      dateInput.classList.add('date-picker')
      taskInput.insertAdjacentElement('afterend', dateInput)

      AllTasks.initDatePicker(dateInput, null, (selectedDate) => {
        taskInput.dataset.dueDate = selectedDate
        dateInput.remove()
      })

      dateInput.focus()
    })

    // task options button
    taskOptionsIcon.addEventListener('focus', () => {
      optionsContainer.classList.remove('hidden')
    })

    // projects select
    const projects = AllProjects.getProjects()
    projects.forEach((project) => {
      const option = document.createElement('option')
      option.value = project.name
      option.textContent = project.name
      taskProject.appendChild(option)
    })
  }

  return { setupEventListeners }
})()

export default AddTaskController
