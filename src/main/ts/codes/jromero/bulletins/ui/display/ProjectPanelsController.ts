class ProjectPanelsController {

  private _bulletinsRepo: BulletinsRepo
  private _projectPanels: ProjectPanels
  private _userRepo: UserRepo

  constructor(bulletinsRepo: BulletinsRepo, userRepo: UserRepo, projectPanels: ProjectPanels) {
    this._bulletinsRepo = bulletinsRepo
    this._userRepo = userRepo
    this._projectPanels = projectPanels
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

    this._projectPanels.setOnEditPostClickListener(projectKey, function (bulletinId) {
      AJS.log(`Displaying dialog for ${projectKey}, bulletin`)
      var postDialog = new EditDialog(
        that._bulletinsRepo,
        that._userRepo,
        that._projectPanels,
        projectKey,
        bulletinId
      )

      AJS.$("body").append(postDialog.element)
      AJS.dialog2(`#${postDialog.id}`).show()
    })


    AJS.tabs.setup();
  }

  setActiveProject(projectKey: string) {
    AJS.tabs.change(AJS.$(`a[href="#${this._projectPanels.paneId(projectKey)}"]`));
  }
}