import Task from './task'
import isBefore from 'date-fns/isBefore'
import isToday from 'date-fns/isToday'
import isWithinInterval from 'date-fns/isWithinInterval'
import addDays from 'date-fns/addDays'
import { format, isValid } from 'date-fns'
import flatpickr from 'flatpickr'

const AllTasks = (function () {
  const tasks = []

  const addTask = (task) => tasks.push(task)

  const removeTask = (index) => tasks.splice(index, 1)

  const getTasks = () => [...tasks]

  const formatDate = (date) => {
    if (!date) return 'No due date'
    const parsedDate = new Date(date)

    if (!isValid(parsedDate)) {
      console.error(`Invalid date: ${date}`)
      return 'Invalid date'
    }

    return format(parsedDate, 'dd.MM.yyyy')
  }

  const updateTask = (index, updatedTask) => {
    tasks[index] = updatedTask
  }

  const updateTaskDueDate = (index, newDueDate) => {
    if (tasks[index]) {
      tasks[index].dueDate = newDueDate
    }
  }

  const updateTaskChecklist = (index, newCheckbox) => {
    if (tasks[index]) {
      tasks[index].checklist = newCheckbox
    }
  }

  // filtering methods
  const getOverdueTasks = () => {
    const currentDate = new Date()
    return tasks.filter(
      (task) => task.dueDate && isBefore(new Date(task.dueDate), currentDate),
    )
  }

  const getTodayTasks = () => {
    return tasks.filter(
      (task) => task.dueDate && isToday(new Date(task.dueDate)),
    )
  }

  const getThisWeekTasks = () => {
    const today = new Date()
    const endOfWeek = addDays(today, 7)

    return tasks.filter((task) => {
      if (!task.dueDate) return false
      return isWithinInterval(new Date(task.dueDate), {
        start: today,
        end: endOfWeek,
      })
    })
  }

  const startWithTestTasks = () => {
    const today = new Date()
    // const displayDate = format(today, 'dd-MM-yyyy')
    const storedDate = format(today, 'yyyy-MM-dd')
    // const parsedDate = parseISO(storedDate)

    tasks.push(
      new Task({
        title: 'Buy groceries',
        description: 'Milk, bread, eggs',
        checklist: false,
        priority: 'low',
      }),
    )
    tasks.push(
      new Task({
        title: 'Wash dishes',
        dueDate: storedDate,
        checklist: false,
        priority: 'medium',
        notes: 'My mom asked me to do this',
      }),
    )
    tasks.push(
      new Task({
        title: 'Do homework',
        notes: 'Math, physics',
        dueDate: storedDate,
        checklist: true,
        priority: 'high',
      }),
    )
  }

  const initDatePicker = (element, initialDate, onDateSelected) => {
    flatpickr(element, {
      enableTime: false,
      dateFormat: 'd.m.Y',
      defaultDate: initialDate ? new Date(initialDate) : new Date(),
      onClose: (selectedDates) => {
        if (selectedDates.length > 0) {
          const newDate = selectedDates[0]
          if (typeof onDateSelected === 'function') {
            onDateSelected(newDate)
          }
        }
      },
    })
  }

  return {
    addTask,
    removeTask,
    updateTask,
    getTasks,
    formatDate,
    updateTaskDueDate,
    updateTaskChecklist,
    getOverdueTasks,
    getTodayTasks,
    getThisWeekTasks,
    startWithTestTasks,
    initDatePicker,
  }
})()

export default AllTasks
