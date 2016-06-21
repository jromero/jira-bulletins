class ProjectPanelsController {

  private DATA_KEY_PROJECT: string = "data-project"
  private _bulletinsRepo: BulletinsRepo
  private _projectPanels: ProjectPanels

  constructor(bulletinsRepo: BulletinsRepo, projectPanels: ProjectPanels) {
    this._bulletinsRepo = bulletinsRepo
    this._projectPanels = projectPanels

    var that = this
    AJS.$(this._projectPanels.element).on("click", "a.aui-button-primary", function () {
      var projectKey = AJS.$(this).attr(that.DATA_KEY_PROJECT)
      AJS.log(`Displaying dialog for ${projectKey}`)
      var postDialog = new PostDialog(bulletinsRepo, projectKey)
      AJS.$("body").append(postDialog.element)
      AJS.dialog2(`#${postDialog.id}`).show()
    })
  }

  addProject(projectKey: string) {
    var that = this

    this._projectPanels.menu.append(
      `<li class="menu-item">
        <a href="#${this.paneId(projectKey)}">${projectKey}</a>
      </li>`
    )

    this._projectPanels.element.append(
      `<div class="tabs-pane" id="${this.paneId(projectKey)}">
        <a class="aui-button aui-button-primary aui-style" ${this.DATA_KEY_PROJECT}="${projectKey}">
          Post to ${projectKey}
        </a>
       </div>`
    )

    this._bulletinsRepo.findAll(projectKey, function (response) {
      for (let bulletin of response.bulletins) {
        that._projectPanels.element.find(`#${that.paneId(projectKey)}`).append(`${bulletin.body}`)
      }
    })

    AJS.tabs.setup();
  }

  setActiveProject(projectKey: string) {
    AJS.tabs.change(AJS.$(`a[href="#${this.paneId(projectKey)}"]`));
  }

  private normalizeKey(projectKey: string): string {
    return projectKey.toLowerCase()
  }

  private paneId(projectKey: string): string {
    return `bulletins-tab-pane-${this.normalizeKey(projectKey)}`
  }
}