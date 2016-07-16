class BulletinsRepo {

  _basePath = `${AJS.contextPath()}/rest/bulletins/1`

  constructor() {

  }

  findAll(projectKey: string, callback: (response: GetBulletinsResponse, textStatus: string, jqXHR: JQueryXHR) => any) : JQueryXHR {
    return AJS.$.get(`${this._basePath}/boards/${projectKey}/bulletins`, callback)
  }

  findById(projectKey: string, id: number, callback: (bulletin: Bulletin, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR {
    return AJS.$.get(`${this._basePath}/boards/${projectKey}/bulletins/${id}`, callback)
  }

  save(projectKey: string, bulletin: Bulletin, callback: (data: Bulletin, textStatus: string, jqXHR: JQueryXHR) => any): JQueryXHR {
    return AJS.$.ajax({
      url: `${AJS.params.baseURL}/rest/bulletins/1/boards/${projectKey}/bulletins`,
      type: "POST",
      data: JSON.stringify({
        id: bulletin.id,
        body: bulletin.body
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: callback
    })
  }
}

interface PaginatedResponse {
  count: number,
  totalCount: number
}

interface GetBulletinsResponse extends PaginatedResponse {
  bulletins: Bulletin[]
}