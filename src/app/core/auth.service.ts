import { map } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserDetails } from './typeFiles/user-details';
import { isNullOrUndefined } from 'util';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  constructor(private cookie: CookieService) {
    this.onAuthChange$ = new Subject();
  }
  get isLoggedIn() {
    return sessionStorage.getItem('isUserLoggedIn') === 'true' ? true : false;
  }

  public onAuthChange$: Subject<UserDetails>;
  private isLoggedInStatus: boolean;

  @Output() isUserAvailable: EventEmitter<boolean> = new EventEmitter();
1;

  setLoggedIn(value: boolean) {
      this.isLoggedInStatus =  value;
      this.cookie.set('isLoggedIn', String(value));
      sessionStorage.setItem('isUserLoggedIn', String(value));
  }

  setUser(user: UserDetails) {

    this.onAuthChange$.next(user);
    user.roleValue = user.roles.map(role => role.name).join('-');
    const userString = JSON.stringify(user);
    this.cookie.set('userSession', userString);
    sessionStorage.setItem('isUserLoggedIn', 'true');
    this.isUserAvailable.emit(true);

  }

  getCurrentUser(): UserDetails {
    const userString = this.cookie.get('userSession');
    if (!isNullOrUndefined(userString)) {
      const user: UserDetails = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  setToken(token: string) {
    this.cookie.set('accessToken', token);
  }
  getToken(): string {
    return this.cookie.get('accessToken');
  }

  logout() {

    this.onAuthChange$.next(null);
    this.cookie.delete('current');
    this.cookie.delete('accessToken');
    this.setLoggedIn(false);
    sessionStorage.removeItem('isUserLoggedIn');
    this.isUserAvailable.emit(false);
  }

}
