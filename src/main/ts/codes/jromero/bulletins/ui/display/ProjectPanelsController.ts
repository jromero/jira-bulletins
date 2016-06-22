class ProjectPanelsController {

  private DATA_KEY_PROJECT: string = "data-project"
  private _bulletinsRepo: BulletinsRepo
  private _projectPanels: ProjectPanels

  constructor(bulletinsRepo: BulletinsRepo, projectPanels: ProjectPanels) {
    this._bulletinsRepo = bulletinsRepo
    this._projectPanels = projectPanels

    var that = this

  }

  addProject(projectKey: string) {
    var that = this

    this._projectPanels.addProject(projectKey)
    this._projectPanels.reloadContents(projectKey)
    this._projectPanels.setOnAddPostClickListener(projectKey, function () {
      AJS.log(`Displaying dialog for ${projectKey}`)
      var postDialog = new PostDialog(that._bulletinsRepo, that._projectPanels, projectKey)
      AJS.$("body").append(postDialog.element)
      AJS.dialog2(`#${postDialog.id}`).show()
    })

    AJS.tabs.setup();
  }

  setActiveProject(projectKey: string) {
    AJS.tabs.change(AJS.$(`a[href="#${this._projectPanels.paneId(projectKey)}"]`));
  }
}