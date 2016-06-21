interface AJSParams {
  baseURL: string
}

interface AJSDialog2 {

  off(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): AJSDialog2

  on(event: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): AJSDialog2

  show(): AJSDialog2

  hide(): AJSDialog2

  remove(): AJSDialog2

  isVisible(): boolean
}

interface AJS {
  $: JQueryStatic
  toInit: any
  params: AJSParams
  messages: any
  tabs: any

  /**
   * Returns the "path" to the application, which is needed when creating absolute urls within the application.
   *
   * @since 3.5.5
   */
  contextPath(): string

  /**
   *
   * @param selector
   */
  dialog2(selector: string): AJSDialog2

  /**
   * Performs html-safe escaping of the input string.
   *
   * @since 4.0
   */
  escapeHTML(html: string): string

  /**
   * Provides an easy way to substitute parameters into a string.
   *
   * @since 1.0
   */
  format(format: string, ...args: any[]): string

  /**
   * A safe alternative to console.log(). It ensures that both console and the console.log method exist before executing.
   *
   * @since 1.0
   */
  log(message: string): void
}

declare var AJS: AJS