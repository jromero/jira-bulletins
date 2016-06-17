class ProjectPanels {

  private _element: JElement
  private _menu: JElement
  private _content: JElement

  constructor() {
    this._element = AJS.$(
      `<div id="bulletins-tabs" class="aui-tabs horizontal-tabs">
        <ul id="bulletins-tabs-menu" class="tabs-menu" />
        <section id="bulletins-tabs-content" />
      </div>`
    )

    this._menu = this._element.find("#bulletins-tabs-menu")

    this._content = this._element.find("#bulletins-tabs-content")
  }

  get element(): JElement {
    return this._element
  }

  get menu(): JElement {
    return this._menu
  }

  get content(): JElement {
    return this._content
  }
}