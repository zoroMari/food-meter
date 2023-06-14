import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IUser, User } from '../auth/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit, OnDestroy {
  public isAuthorized!: boolean;
  private _sub!: Subscription;

  constructor(
    private _AuthService: AuthService,
  ) { }

  ngOnInit(): void {
    this._sub = this._AuthService.user.subscribe(
      (user: User) => this.isAuthorized = !!user
    )
  }

  ngOnDestroy(): void {
      this._sub.unsubscribe();
  }

  public handleLogout() {
    this._AuthService.logout();
  }
}
