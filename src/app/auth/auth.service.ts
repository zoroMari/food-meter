import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IUser, User } from "./user.model";

export interface AuthResponceData {
  kind: string,
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user = new BehaviorSubject<User | null>(null);
  private _tokenExpirationTimer: any;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  public signup(email: string, password: string) {
    return this._http.post<AuthResponceData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this._handleError),
      tap(resData => {
        this._handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  public login(email: string, password: string) {
    return this._http.post<AuthResponceData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
        catchError(this._handleError),
        tap(resData => {
          this._handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      );
  }

  public autoLogin() {
    const userData: IUser = JSON.parse(localStorage.getItem('foodMetterUserData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    )
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  public logout() {
    this.user.next(null);
    this._router.navigate(['/auth']);
    localStorage.removeItem('foodMetterUserData');
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private _handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user: User = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('foodMetterUserData', JSON.stringify(user));
  }

  private _handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }

        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'User with such email already exists!';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist!!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct!';
            break;
        }

        return throwError(errorMessage);
  }
}
