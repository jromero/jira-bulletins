
class UserRepo {

  private _basePath: string = AJS.contextPath()

  currentUser(callback: (user: User, textStatus: string, jqXHR: JQueryXHR) => any) {
    return AJS.$.get(`${this._basePath}/rest/api/2/myself`, callback)
  }

  findByKey(key: string, callback: (user: User, textStatus: string, jqXHR: JQueryXHR) => any) {
    return AJS.$.get(`${this._basePath}/rest/api/2/user?key=${key}`, callback)
  }
}