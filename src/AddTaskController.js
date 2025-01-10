import 'flatpickr/dist/flatpickr.min.css'
import AllTasks from './AllTasks'

const AddTaskController = (function () {
  const taskInput = document.getElementById('task-input')
  const taskOptions = document.getElementById('task-options')
  const taskDateIcon = document.getElementById('task-date-icon')
  const taskPriority = document.getElementById('task-priority')

  const setupEventListeners = (onTaskAdd) => {
    // showing icons after clicking input
    taskInput.addEventListener('focus', () => {
      taskOptions.classList.remove('hidden')
    })

    // concealing additional elements
    taskInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (taskInput.value.trim() === '') {
          taskOptions.classList.add('hidden')
        }
      }, 200)
    })

    // adding task after enter
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && taskInput.value.trim() != '') {
        const title = taskInput.value.trim()
        const priority = taskPriority.value
        const dueDate = taskInput.dataset.dueDate || null

        onTaskAdd(title, '', dueDate, priority)

        taskInput.value = ''
        taskOptions.classList.add('hidden')
      }
    })

    // date pick
    taskDateIcon.addEventListener('click', () => {
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
  }

  return { setupEventListeners }
})()

export default AddTaskController
