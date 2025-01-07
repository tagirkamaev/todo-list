import AllTasks from './AllTasks'

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
      taskDueDate.textContent = task.dueDate ? task.formatDueDate() : ''

      taskDueDate.addEventListener('click', () => {
        const newDate = prompt('Enter new due date (dd-mm-yyyy):', task.dueDate)
        if (newDate) {
          AllTasks.updateTaskDueDate(index, newDate)
          task.dueDate.textContent = task.formatDueDate()
        }
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

  const renderTaskDetails = (task) => {
    const detailsContainer = document.getElementById('task-details')

    detailsContainer.innerHTML = ''

    const priorityFlag = document.createElement('i')
    priorityFlag.classList.add('priority-flag')
    priorityFlag.classList.add('fa-solid', 'fa-flag')
    priorityFlag.style.color =
      task.priority === 'high'
        ? '#e74c3c'
        : task.priority === 'medium'
          ? '#f1c40f'
          : '#2ecc71'

    const checkboxInDetails = document.createElement('input')
    checkboxInDetails.type = 'checkbox'
    checkboxInDetails.classList.add('checkbox-details')
    checkboxInDetails.addEventListener('change', () => {
      AllTasks.updateTaskChecklist
    })

    const dueDateInDetailsContainer = document.createElement('div')
    const dueDateIcon = document.createElement('i')
    dueDateIcon.classList.add('date-details')
    dueDateIcon.classList.add('fa-solid', 'fa-calendar')
    dueDateInDetailsContainer.appendChild(dueDateIcon)
    if (task.dueDate) {
      const dueDateInDetails = document.createElement('span')
      dueDateInDetails.textContent = task.dueDate
      dueDateInDetailsContainer.appendChild(dueDateInDetails)
    }

    detailsContainer.appendChild(dueDateInDetailsContainer)
    detailsContainer.appendChild(checkboxInDetails)
    detailsContainer.appendChild(priorityFlag)
    // update title
    // const titleField = detailsContainer.querySelector("#details-title");
    // titleField.addEventListener("input", () => {
    //   task.title = titleField.value;
    //   if (typeof onUpdateTitle === "function") {
    //     onUpdateTitle(task.index, task.title);
    //   }
    // });

    // // update notes
    // const notesField = detailsContainer.querySelector("#details-notes");
    // notesField.addEventListener("input", () => {
    //   task.notes = notesField.value;
    //   if (typeof onUpdateNotes === "function") {
    //     onUpdateNotes(task.index, task.notes);
    //   }
    // });

    // const dateField = detailsContainer.querySelector("#details-date");
    // dateField.addEventListener("change", () => {
    //   task.dueDate = dateField.value;
    //   if (typeof onUpdateDate === "function") {
    //     onUpdateDate(task.index, task.dueDate);
    //   }
    // });
  }

  let onDelete = null
  let onToggle = null
  let onTaskSelected = null
  let onUpdateTitle = null
  let onUpdateNotes = null
  let onUpdateDate = null

  const setCallbacks = (callbacks) => {
    onDelete = callbacks.onDelete
    onToggle = callbacks.onToggle
    onTaskSelected = callbacks.onTaskSelected
    onUpdateNotes = callbacks.onUpdateNotes
    onUpdateTitle = callbacks.onUpdateTitle
  }

  return { renderTasks, renderTaskDetails, setCallbacks }
})()

export default DisplayTaskController
