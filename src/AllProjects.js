import Project from './project'

const AllProjects = (function () {
  const projects = []

  const addProject = (project) => projects.push(project)
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
