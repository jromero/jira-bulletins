class PostDialog {

  private _projectKey: string
  private _element: JElement
  private _content: JElement

  constructor(projectKey: string, id?: number) {
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
                <button id="dialog-submit-button" class="aui-button aui-button-primary">OK</button>
                <button id="dialog-close-button" class="aui-button aui-button-link">Close</button>
              </div>
              <div class="aui-dialog2-footer-hint"><i>Markdown</i> is supported</div>
            </footer>
          </form>
        </section>`
      )

    this._content = AJS.$(".aui-dialog2-content")
  }

  get id(): string {
    return `post-dialog-${this._projectKey}`
  }

  get element(): JElement {
    return this._element
  }
}