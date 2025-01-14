import Project from './project'
import AllTasks from './AllTasks'

const AllProjects = (function () {
  const projects = []

  // BASIC OPERATIONS
  const addProject = (project) => {
    if (!projects.includes(project)) {
      projects.push(project)
    }
  }
  const removeProject = (index) => projects.splice(index, 1)

  const getProjects = () => [...projects]

  // METHODS FOR EXPORT
  const getProjectByName = (name) =>
    projects.find((project) => project.name === name)

  const getOrCreateProject = (name, isSystem) => {
    let project = getProjectByName(name)
    if (!project) {
      project = new Project(name, isSystem)
      addProject(project)
    }
    return project
  }

  const getDefaultProject = () => getOrCreateProject('Inbox', true)

  // OTHERS
  const startWithTestProjects = () => {
    projects.push(new Project('Testik'))
  }

  const getTasksForProject = (projectName) => {
    return AllTasks.getTasks().filter(
      (task) => task.projectName === projectName,
    )
  }

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
