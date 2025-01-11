const DisplayProjectsController = (function () {
  const renderProjects = function (projects) {
    const projectsContainer = document.getElementById('project-list')
    projectsContainer.innerHTML = ''

    //display projects
    projects.forEach((project) => {
      const projectCard = document.createElement('li')
      projectCard.textContent = `${project.name} (${project.tasks.length})`
      projectCard.classList.add('project')

      projectCard.addEventListener('click', () => {
        if (typeof onProjectSelected === 'function') {
          onProjectSelected(project)
        }
      })

      projectsContainer.appendChild(projectCard)
    })
  }

  let onProjectSelected = null

  const setCallbacksProjects = (callbacks) => {
    onProjectSelected = callbacks.onProjectSelected
  }

  return { renderProjects, setCallbacksProjects }
})()

export default DisplayProjectsController
