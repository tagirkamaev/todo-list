import Project from './project'

const AllProjects = (function () {
  const projects = []

  const defaultProject = new Project('Inbox')
  projects.push(defaultProject)

  const addProject = (project) => {
    if (!projects.includes(project)) {
      projects.push(project)
    }
  }
  const removeProject = (index) => projects.splice(index, 1)
  const getProjects = () => [...projects]
  const getProjectByName = (name) =>
    projects.find((project) => project.name === name)

  const startWithDefaultProject = () => {
    projects.push(new Project('Default'))
  }

  return {
    addProject,
    removeProject,
    getProjects,
    getProjectByName,
    startWithDefaultProject,
  }
})()

export default AllProjects
