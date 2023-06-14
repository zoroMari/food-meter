export interface IUser {
  email: string;
  id: string;
  _token: string,
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
  ) {}

  get token() {
    return this._token;
  }
}
