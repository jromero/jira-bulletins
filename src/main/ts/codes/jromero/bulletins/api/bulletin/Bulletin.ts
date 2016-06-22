class Bulletin {
  private _id: number
  private _body: string

  constructor(id: number, body: string)  {
    this._id = id == undefined || id <= 0 ? undefined : id
    this._body = body
  }

  get id(): number {
    return this._id
  }

  get body(): string {
    return this._body
  }

  rendered: string

  createdBy: string

  /**
   * Milliseconds
   */
  createdAt: number

  /**
   * Milliseconds
   */
  updatedAt: number
}