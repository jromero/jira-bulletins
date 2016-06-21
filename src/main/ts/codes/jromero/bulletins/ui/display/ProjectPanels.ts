class ProjectPanels {

  private _element: JElement
  private _menu: JElement

  constructor() {
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
}