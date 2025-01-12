import Project from './project'
import AllTasks from './AllTasks'

const AllProjects = (function () {
  const projects = []

  const defaultProject = new Project('Inbox')
  projects.push(defaultProject)

  // BASIC OPERATIONS
  const addProject = (project) => {
    if (!projects.includes(project)) {
      projects.push(project)
    }
  }
  const removeProject = (index) => projects.splice(index, 1)

  const getProjects = () => [...projects]

  const getProjectByName = (name) =>
    projects.find((project) => project.name === name)

  const getOrCreateProject = (name) => {
    let project = getProjectByName(name)
    if (!project) {
      project = new Project(name)
      addProject(project)
    }
    return project
  }

  // const startWithDefaultProject = () => {
  //   projects.push(new Project('Default'))
  // }

  const startWithTestProjects = () => {
    projects.push(new Project('Testik'))
  }

  const getTasksForProject = (projectName) => {
    return AllTasks.getTasks().filter(
      (task) => task.projectName === projectName,
    )
  }

  const getDefaultProject = () => defaultProject

  return {
    addProject,
    getOrCreateProject,
    getDefaultProject,
    removeProject,
    getProjects,
    getProjectByName,
    // startWithDefaultProject,
    startWithTestProjects,
    getTasksForProject,
  }
})()

export default AllProjects
