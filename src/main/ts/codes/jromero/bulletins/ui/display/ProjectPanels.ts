class ProjectPanels {

  private _element: JElement
  private _menu: JElement
  private _projectsPanes: Map<JQuery> = new Map<JQuery>()
  private _bulletinsRepo: BulletinsRepo

  constructor(bulletinsRepo: BulletinsRepo) {
    this._bulletinsRepo = bulletinsRepo

    this._element = AJS.$(
      `<div id="bulletins-tabs" class="aui-tabs horizontal-tabs">
        <ul id="bulletins-tabs-menu" class="tabs-menu" />
      </div>`
    )

    this._menu = this._element.find("#bulletins-tabs-menu")
  }

  get element(): JElement {
    return this._element
  }

  get menu(): JElement {
    return this._menu
  }

  addProject(projectKey: string) {
    this._menu.append(
      `<li class="menu-item">
        <a href="#${this.paneId(projectKey)}">${projectKey}</a>
      </li>`
    )

    var projectPane = AJS.$(
      `<div class="tabs-pane" id="${this.paneId(projectKey)}">
        <div class="bulletins-bulletins" />
        <a id="${this.postButtonId(projectKey)}" class="aui-button aui-button-primary aui-style">
          Post to ${projectKey}
        </a>
       </div>`
    )

    this._projectsPanes.add(projectKey, projectPane)
    this._element.append(projectPane)
  }

  addBulletin(projectKey: string, contents: string) {
    var projectPane = this._projectsPanes.get(projectKey)
    if (projectPane != null) {
      projectPane.find(".bulletins-bulletins").append(
        `<div class="bulletins-bulletin aui-page-panel">
            ${contents}
          </div>`
      )
    }
  }

  clearBulletins(projectKey: string) {
    var projectPane = this._projectsPanes.get(projectKey)
    if (projectPane != null) {
      projectPane.find(".bulletins-bulletins").empty()
    }
  }

  paneId(projectKey: string): string {
    return `bulletins-tab-pane-${this.normalizeKey(projectKey)}`
  }

  reloadContents(projectKey: string) {
    var that = this

    that.clearBulletins(projectKey)

    that._bulletinsRepo.findAll(projectKey, function (response) {
      for (let bulletin of response.bulletins) {
        that.addBulletin(projectKey, bulletin.rendered)
      }
    })
  }

  setOnAddPostClickListener(projectKey: string, callback: (event: JQueryEventObject) => any) {
    var pane = this._projectsPanes.get(projectKey)
    if (pane != null) {
      pane.find(`#${this.postButtonId(projectKey)}`).click(callback)
    }
  }

  private normalizeKey(projectKey: string): string {
    return projectKey.toLowerCase()
  }

  private postButtonId(projectKey: string): string {
    return `bulletins-post-${this.normalizeKey(projectKey)}`
  }
}
