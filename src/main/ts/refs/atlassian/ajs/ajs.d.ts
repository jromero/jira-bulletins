interface AJSParams {
  baseURL: string
}

interface AJS {
  $: JQueryStatic
  toInit: any
  log: any
  params: AJSParams
  messages: any
  tabs: any
  dialog2: any
}

declare var AJS: AJS