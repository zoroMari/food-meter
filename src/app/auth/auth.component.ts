import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  public form!: FormGroup;
  public isLogin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isLogin = true;
    this._formInitialization();
  }

  private _formInitialization() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  public handleToSignUp() {
    this.isLogin = false;
  }

  public handleToLogIn() {
    this.isLogin = true;
  }

}
