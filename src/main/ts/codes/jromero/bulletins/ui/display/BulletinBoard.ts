class BulletinBoard {

  private _element: JElement
  private _handle: JElement
  private _contents: JElement

  constructor(title: string, expandedWidth: number) {
    this._element = AJS.$(`<div id="bulletins-container">
          <a id="bulletins-tab-label" class="aui-button aui-button-primary aui-style">${title}</a>
          <div class="aui-page-panel">
            <div class="aui-page-panel-inner">
                <section id="bulletins-content" class="aui-page-panel-content" style="display: none;">
                    <h2>${title}</h2>
                </section>
            </div>
          </div>
        </div>
        `)

    this._handle = this._element.find("#bulletins-tab-label")
    this._contents = this._element.find("#bulletins-content")

    this._handle.draggable({axis: "y", cursor: "move"})

    var that = this
    this._handle.click(function () {
      if (that._element.width() == 0) {
        that._contents.show()
        that._element.width(expandedWidth)
      } else {
        that._contents.hide()
        that._element.width(0)
      }
    })
  }

  get element(): JElement {
    return this._element
  }

  get handle(): JElement {
    return this._handle
  }

  get contents(): JElement {
    return this._contents
  }
}