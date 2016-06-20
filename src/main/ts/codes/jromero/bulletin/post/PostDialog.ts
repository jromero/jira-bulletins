class PostDialog {

  private _projectKey: string
  private _element: JElement
  private _content: JElement
  private _submitButton: JElement
  private _closeButton: JElement

  constructor(projectKey: string, id?: number) {
    var that = this

    this._projectKey = projectKey

    this._element =
      AJS.$(
        `<section id="${this.id}" 
                role="dialog"
                class="aui-layer aui-dialog2 aui-dialog2-medium bulletins-dialog" 
                aria-hidden="true"
                data-aui-remove-on-hide="true"
                data-aui-focus-selector=".aui-dialog2-content :textarea">
          <form class="aui">
            <header class="aui-dialog2-header">
              <div class="aui-dialog2-header-main">
                <h2>Post to ${projectKey}</h2>
              </div>
              <div class="aui-dialog2-header-secondary"></div>
              <a class="aui-dialog2-header-close">
                <span class="aui-icon aui-icon-small aui-iconfont-close-dialog">Close</span>
              </a>
            </header>
            <div class="aui-dialog2-content">
              <textarea class="textarea" placeholder="# Enter _markdown_ for your **bulletin** ..."></textarea>
            </div>
            <footer class="aui-dialog2-footer">
              <div class="aui-dialog2-footer-actions">
                <button class="aui-button aui-button-primary bulletins-submit-button">OK</button>
                <button class="aui-button aui-button-link bulletins-close-button">Close</button>
              </div>
              <div class="aui-dialog2-footer-hint"><i>Markdown</i> is supported</div>
            </footer>
          </form>
        </section>`
      )

    this._content = this._element.find(".aui-dialog2-content")
    this._submitButton = this._element.find(".bulletins-submit-button")
    this._closeButton = this._element.find(".bulletins-close-button")

    this._submitButton.click(function (e) {
      e.preventDefault()

      AJS.$.ajax({
        url: `${AJS.params.baseURL}/rest/bulletins/1/boards/${projectKey}/bulletins`,
        type: "POST",
        data: JSON.stringify({
          title: "",
          body: that._content.find("textarea").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          AJS.log("Received response!")
          AJS.log("Response: " + JSON.stringify(data))

          AJS.dialog2(`#${that.id}`).hide();
        }
      })
    })

    this._closeButton.click(function (e) {
      e.preventDefault()

      AJS.dialog2(`#${that.id}`).hide();
    })
  }

  get id(): string {
    return `post-dialog-${this._projectKey}`
  }

  get element(): JElement {
    return this._element
  }
}