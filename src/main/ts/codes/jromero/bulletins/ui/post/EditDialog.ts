class EditDialog extends BaseDialog {

  constructor(bulletinsRepo: BulletinsRepo, projectPanels: ProjectPanels, projectKey: string, id: number) {
    super(bulletinsRepo, projectPanels, projectKey)
    var that = this

    that.setTitle(`Bulletin #${id}`)
    that.disable()

    that.submitButton.click(function (e) {
      e.preventDefault()
      var text = that.textarea.val()
      bulletinsRepo.save(projectKey, new Bulletin(id, text), function (bulletin) {
        AJS.log("Bulletin saved: " + JSON.stringify(bulletin))

        projectPanels.reloadContents(projectKey)

        that.hide()
      })
    })

    bulletinsRepo.findById(projectKey, id, function (bulletin, textStatus, jqXHR) {
      that.textarea.val(bulletin.body)
      that.enable()
    })
  }
}