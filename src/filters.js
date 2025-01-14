import AllProjects from './AllProjects'
import AllTasks from './AllTasks'

const filters = [
  {
    name: 'Inbox',
    type: 'system',
    id: 'inbox',
    handler: () => AllProjects.getDefaultProject().getTasks(),
  },
  {
    name: 'Overdue',
    type: 'dynamic',
    id: 'overdue',
    handler: () => AllTasks.getOverdueTasks(),
  },
  {
    name: 'Today',
    type: 'dynamic',
    id: 'today',
    handler: () => AllTasks.getTodayTasks(),
  },
  {
    name: 'This week',
    type: 'dynamic',
    id: 'week',
    handler: () => AllTasks.getThisWeekTasks(),
  },
]

export default filters
