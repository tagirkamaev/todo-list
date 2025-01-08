import AllTasks from './AllTasks'
import 'flatpickr/dist/flatpickr.min.css'

const DisplayTaskController = (function () {
  const renderTasks = function (tasks) {
    const taskContainer = document.getElementById('tasks')
    taskContainer.innerHTML = ''

    // display tasks
    tasks.forEach((task, index) => {
      const taskCard = document.createElement('div')
      taskCard.classList.add('todo')

      // attaching class depending on priority
      if (task.priority === 'high') {
        taskCard.classList.add('priority-high')
      } else if (task.priority === 'medium') {
        taskCard.classList.add('priority-medium')
      } else if (task.priority === 'low') {
        taskCard.classList.add('priority-low')
      }

      // checkbox
      const checkboxContainer = document.createElement('div')
      checkboxContainer.classList.add('checkbox')
      const taskCheckbox = document.createElement('input')
      taskCheckbox.setAttribute('type', 'checkbox')
      taskCheckbox.setAttribute('data-task-index', index)
      taskCheckbox.checked = task.checklist
      checkboxContainer.appendChild(taskCheckbox)

      // task content
      const taskContent = document.createElement('div')
      taskContent.classList.add('task-content')

      const taskTitle = document.createElement('span')
      taskTitle.classList.add('task-title')
      taskTitle.textContent = task.title

      const taskDueDate = document.createElement('span')
      taskDueDate.classList.add('task-due-date')
      taskDueDate.textContent = task.dueDate
        ? AllTasks.formatDate(task.dueDate)
        : ''

      taskDueDate.addEventListener('click', () => {
        const dateInput = document.createElement('input')
        dateInput.type = 'text'
        dateInput.classList.add('date-picker-input')
        taskDueDate.replaceWith(dateInput)

        AllTasks.initDatePicker(dateInput, task.dueDate, (newDate) => {
          if (typeof onUpdateDate === 'function') {
            onUpdateDate(index, newDate)
          }
          taskDueDate.textContent = AllTasks.formatDate(newDate)
          dateInput.replaceWith(taskDueDate)
        })

        dateInput.focus()
      })

      taskContent.appendChild(taskTitle)
      taskContent.appendChild(taskDueDate)

      // delete button
      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('delete-task')

      taskCard.appendChild(checkboxContainer)
      taskCard.appendChild(taskContent)
      taskCard.appendChild(deleteButton)

      taskCard.addEventListener('click', () => {
        if (typeof onTaskSelected === 'function') {
          onTaskSelected(index)
        }
      })

      taskContainer.appendChild(taskCard)

      // callback for events
      deleteButton.addEventListener('click', () => {
        if (typeof onDelete === 'function') onDelete(index)
      })

      taskCheckbox.addEventListener('change', () => {
        if (typeof onToggle === 'function')
          onToggle(index, taskCheckbox.checked)
      })
    })
  }

  const renderTaskDetails = (task, index) => {
    const detailsContainer = document.getElementById('task-details')

    detailsContainer.innerHTML = ''

    // priority
    const priorityFlag = document.createElement('i')
    priorityFlag.classList.add('priority-flag')
    priorityFlag.classList.add('fa-solid', 'fa-flag')
    priorityFlag.style.color =
      task.priority === 'high'
        ? '#e74c3c'
        : task.priority === 'medium'
          ? '#f1c40f'
          : '#2ecc71'

    // checklist
    const checkboxInDetails = document.createElement('input')
    checkboxInDetails.type = 'checkbox'
    checkboxInDetails.classList.add('checkbox-details')
    checkboxInDetails.checked = task.checklist

    // due date
    const dueDateInDetailsContainer = document.createElement('div')
    const dueDateIcon = document.createElement('i')
    dueDateIcon.classList.add('date-details')
    dueDateIcon.classList.add('fa-solid', 'fa-calendar')
    dueDateInDetailsContainer.appendChild(dueDateIcon)
    if (task.dueDate) {
      const dueDateInDetails = document.createElement('span')
      dueDateInDetails.textContent = AllTasks.formatDate(task.dueDate)
      dueDateInDetailsContainer.appendChild(dueDateInDetails)
    }

    // task title
    const detailsTaskTitle = document.createElement('h4')
    detailsTaskTitle.classList.add('details-title')
    detailsTaskTitle.setAttribute('contenteditable', 'true')
    detailsTaskTitle.textContent = task.title

    // task notes
    const detailsTaskNotes = document.createElement('p')
    detailsTaskNotes.classList.add('details-notes')
    detailsTaskNotes.setAttribute('contenteditable', 'true')
    detailsTaskNotes.textContent = task.notes

    detailsContainer.appendChild(dueDateInDetailsContainer)
    detailsContainer.appendChild(checkboxInDetails)
    detailsContainer.appendChild(priorityFlag)
    detailsContainer.appendChild(detailsTaskTitle)
    detailsContainer.appendChild(detailsTaskNotes)

    // update title
    detailsTaskTitle.addEventListener('input', () => {
      task.title = detailsTaskTitle.textContent.trim()
      if (typeof onUpdateTitle === 'function') {
        onUpdateTitle(index, task.title)
      }
    })

    // update notes
    detailsTaskNotes.addEventListener('input', () => {
      task.notes = detailsTaskNotes.textContent
      if (typeof onUpdateNotes === 'function') {
        onUpdateNotes(index, task.notes)
      }
    })

    // update priority
    priorityFlag.addEventListener('click', () => {
      // clear existing dropdown
      const existingDropdown = document.querySelector('.priority-dropdown')
      if (existingDropdown) {
        existingDropdown.remove()
        return
      }

      // creating dropdown
      const priorityDropdown = document.createElement('select')
      priorityDropdown.classList.add('priority-dropdown')
      const priorityChoices = ['low', 'medium', 'high']
      priorityChoices.forEach((priority) => {
        const option = document.createElement('option')
        option.value = priority.toLowerCase()
        option.textContent = priority
        if (task.priority === option.value) {
          option.selected = true
        }
        priorityDropdown.appendChild(option)
      })

      priorityDropdown.addEventListener('click', (e) => {
        e.stopPropagation()
      })

      priorityDropdown.addEventListener('change', () => {
        const newPriority = priorityDropdown.value
        if (typeof onUpdatePriority === 'function') {
          onUpdatePriority(index, newPriority)
        }
        priorityDropdown.remove() // removing dropdown after select
      })

      priorityFlag.appendChild(priorityDropdown)
    })

    // update dueDate
    dueDateIcon.addEventListener('click', () => {
      // deleting existing picker
      const existingPicker = document.querySelector('.flatpickr-calendar')
      if (existingPicker) {
        existingPicker.remove()
        return
      }

      // creating input for calendar
      const dateInput = document.createElement('input')
      dateInput.type = 'text'
      dateInput.classList.add('datepicker')
      detailsContainer.appendChild(dateInput)

      // initializing flatpickr
      AllTasks.initDatePicker(dateInput, task.dueDate, (newDate) => {
        if (typeof onUpdateDate === 'function') {
          onUpdateDate(index, newDate)
        }
        dateInput.remove()
      })

      dateInput.focus()
    })

    // update checkbox
    checkboxInDetails.addEventListener('change', () => {
      task.checklist = checkboxInDetails.checked
      if (typeof onToggle === 'function') {
        onToggle(index, task.checklist)
      }
    })
  }

  let onDelete = null
  let onToggle = null
  let onTaskSelected = null
  let onUpdateTitle = null
  let onUpdateNotes = null
  let onUpdatePriority = null
  let onUpdateDate = null

  const setCallbacks = (callbacks) => {
    onDelete = callbacks.onDelete
    onToggle = callbacks.onToggle
    onTaskSelected = callbacks.onTaskSelected
    onUpdateTitle = callbacks.onUpdateTitle
    onUpdateNotes = callbacks.onUpdateNotes
    onUpdatePriority = callbacks.onUpdatePriority
    onUpdateDate = callbacks.onUpdateDate
  }

  return { renderTasks, renderTaskDetails, setCallbacks }
})()

export default DisplayTaskController
