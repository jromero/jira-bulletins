
class User {
  private _key: string
  private _emailAddress: string
  private _displayName: string

  get key(): string {
    return this._key
  }

  get emailAddress(): string {
    return this._emailAddress
  }

  get displayName(): string {
    return this._displayName
  }
}