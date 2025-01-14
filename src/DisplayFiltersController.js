import filters from './filters'
import DisplayTaskController from './DisplayTaskController'
import sectionTitleController from './SectionTitle'
import AllProjects from './AllProjects'

const DisplayFiltersController = (function () {
  const renderFilters = function () {
    const filtersContainer = document.getElementById('filter-list')
    filtersContainer.innerHTML = ''

    filters.forEach((filter) => {
      const filterCard = document.createElement('li')
      filterCard.textContent = filter.name
      filterCard.classList.add('filter')
      filterCard.setAttribute('data-id', filter.id)

      filterCard.addEventListener('click', () => {
        if (filter.handler) {
          const tasks = filter.handler()
          sectionTitleController.updateSectionTitle(filter.name)
          DisplayTaskController.renderTasks(tasks)
        } else if (filter.id === 'inbox') {
          const inboxProject = AllProjects.getDefaultProject()
          sectionTitleController.updateSectionTitle(filter.name)
          DisplayTaskController.renderTasksForProject(inboxProject)
        }
      })

      filtersContainer.appendChild(filterCard)
    })
  }

  return { renderFilters }
})()

export default DisplayFiltersController
