import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'food-meter';
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.autoLogin();
  }

}
