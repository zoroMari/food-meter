export interface IUser {
  email: string;
  id: string;
  _token: string,
  _tokenExpirationDate: Date,
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token() {
    return this._token;
  }
}
