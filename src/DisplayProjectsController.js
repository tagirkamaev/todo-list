const DisplayProjectsController = (function () {
  const renderProjects = function (projects) {
    const projectsContainer = document.getElementById('project-list')
    projectsContainer.innerHTML = ''

    //display projects
    projects.forEach((project, index) => {
      const projectCard = document.createElement('li')
      projectCard.textContent = project.name
      projectCard.classList.add('project')

      projectsContainer.appendChild(projectCard)
    })
  }

  return { renderProjects }
})()

export default DisplayProjectsController
