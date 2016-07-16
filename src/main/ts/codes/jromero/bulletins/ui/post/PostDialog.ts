class PostDialog extends BaseDialog {

  constructor(bulletinsRepo: BulletinsRepo, projectPanels: ProjectPanels, projectKey: string) {
    super(bulletinsRepo, projectPanels, projectKey)

    var that = this

    that.setTitle(`Post to ${projectKey}`)
    that.submitButton.click(function (e) {
      e.preventDefault()
      var text = that.textarea.val()
      bulletinsRepo.save(projectKey, new Bulletin(0, text), function (bulletin) {
        AJS.log("Bulletin saved: " + JSON.stringify(bulletin))

        projectPanels.reloadContents(projectKey)

        that.hide()
      })
    })
  }
}