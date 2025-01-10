const sectionTitleController = (function () {
  const sectionTitleElement = document.getElementById('current-view-title')

  const updateSectionTitle = (title) => {
    sectionTitleElement.textContent = title
  }

  return { updateSectionTitle }
})()

export default sectionTitleController
