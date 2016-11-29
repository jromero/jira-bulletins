class EditDialog extends BaseDialog {

  _moreContent: JElement
  _renderedContainer: JElement
  _renderedContent: JElement
  _createdBy: JElement
  _lastUdated: JElement

  constructor(bulletinsRepo: BulletinsRepo, userRepo: UserRepo, projectPanels: ProjectPanels, projectKey: string, id: number) {
    super(bulletinsRepo, projectPanels, projectKey)
    var that = this

    that._moreContent =
      AJS.$(
        `<div>
          <div class="bulletins-rendered-container">
            <div class="bulletins-rendered-content"></div>
            <span class="overlay-icon aui-icon aui-icon-small aui-iconfont-edit"></span>
          </div>
          <div class="bulletins-detail">
            Created By: <span class="bulletins-createdby"></span>
          </div>
          <div class="bulletins-detail">
            Last Updated: <span class="bulletins-lastupdated"></span>
          </div>
        </div>`
      )

    that._renderedContainer = that._moreContent.find(".bulletins-rendered-container")
    that._renderedContent = that._moreContent.find(".bulletins-rendered-content")
    that._createdBy = that._moreContent.find(".bulletins-createdby")
    that._lastUdated = that._moreContent.find(".bulletins-lastupdated")

    that.content.append(that._moreContent)
    that.setTitle(`Bulletin #${id}`)
    that.textarea.hide()

    that.submitButton.click(function (e) {
      e.preventDefault()
      var text = that.textarea.val()
      bulletinsRepo.save(projectKey, new Bulletin(id, text), function (bulletin) {
        AJS.log("Bulletin saved: " + JSON.stringify(bulletin))

        projectPanels.reloadContents(projectKey)

        that.hide()
      })
    })

    bulletinsRepo.findById(projectKey, id, function (bulletin) {
      var date = new Date(bulletin.updatedAt)

      that._renderedContent.html(bulletin.rendered)
      that._createdBy.text(bulletin.createdBy)
      that._lastUdated.text(that.prettyDate(date))

      userRepo.currentUser(function (user) {
        if (bulletin.createdBy == user.key) {
          that.textarea.val(bulletin.body)
          that._renderedContainer.on("click", function () {
            that._renderedContainer.hide()
            that.textarea.show()
          })
        }
      })
    })
  }

  prettyDate(date: Date): string {
    return date.toLocaleString()
  }
}