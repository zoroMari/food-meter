import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponceData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;
  public isLoginMode: boolean = false;
  public isLoading: boolean = false;
  public error: string = null;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoginMode = true;
    this._formInitialization();
  }

  private _formInitialization() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  public handleSubmitForm(form: FormGroup) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponceData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this._router.navigate(['/calculator']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  public handleToSignUp() {
    this.isLoginMode = false;
  }

  public handleToLogIn() {
    this.isLoginMode = true;
  }

}
