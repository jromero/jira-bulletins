class ProjectPanelsController {

  private _projectPanels: ProjectPanels

  constructor(projectPanels: ProjectPanels) {
    this._projectPanels = projectPanels
  }

  addProject(projectKey: string) {
    var normalizedKey = projectKey.toLowerCase()

    this._projectPanels.menu.append(`<li id="bulletin-tab-${normalizedKey}" class="menu-item"><a>${projectKey}</a></li>`)

    this._projectPanels.content.append(
      `<div class="tabs-pane active-pane" id="bulletins-tab-pane-${normalizedKey}">
        <a class="aui-button aui-button-primary aui-style">Add</a>
       </div>`
    )
  }
}