const DisplayProjectsController = (function () {
  const renderProjects = function (projects) {
    const projectsContainer = document.getElementById('project-list')
    projectsContainer.innerHTML = ''

    //display projects
    projects.forEach((project, index) => {
      const projectCardContainer = document.createElement('div')
      projectCardContainer.classList.add('project-card-container')

      const projectCard = document.createElement('div')
      projectCard.textContent = `${project.name}`
      projectCard.classList.add('project')

      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('delete-project-button')

      projectCardContainer.appendChild(projectCard)
      projectCardContainer.appendChild(deleteButton)

      projectCard.addEventListener('click', () => {
        if (typeof onProjectSelected === 'function') {
          onProjectSelected(project)
        }
      })

      deleteButton.addEventListener('click', () => {
        if (typeof onProjectDelete === 'function') {
          onProjectDelete(index)
        }
      })

      projectsContainer.appendChild(projectCardContainer)
    })
  }

  let onProjectSelected = null
  let onProjectDelete = null

  const setCallbacksProjects = (callbacks) => {
    onProjectSelected = callbacks.onProjectSelected
    onProjectDelete = callbacks.onProjectDelete
  }

  return { renderProjects, setCallbacksProjects }
})()

export default DisplayProjectsController
