import { map } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserDetails } from "./typeFiles/user-details";
import { isNullOrUndefined } from "util";
import { Subject } from "rxjs";
import { CookieService } from 'ngx-cookie-service'

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  public onAuthChange$: Subject<UserDetails>
  private isLoggedInStatus: boolean

  @Output() isUserAvailable: EventEmitter<boolean> = new EventEmitter()   

  constructor(private cookie: CookieService) {
    this.onAuthChange$ = new Subject();
  }

  setLoggedIn(value: boolean){
      this.isLoggedInStatus =  value
      this.cookie.set('isLoggedIn',String(value))
      sessionStorage.setItem('isUserLoggedIn', String(value))
  }

  setUser(user: UserDetails) {

    this.onAuthChange$.next(user)
    user.roleValue = user.roles.map(role => role.name)
    let userString = JSON.stringify(user)
    this.cookie.set('userSession',userString)
    sessionStorage.setItem('isUserLoggedIn', 'true')
    this.isUserAvailable.emit(true)

  }

  getCurrentUser(): UserDetails {
    let userString = this.cookie.get('userSession')
    if (!isNullOrUndefined(userString)) {
      let user: UserDetails = JSON.parse(userString);
      return user;
    }
    else {
      return null;
    }
  }

  setToken(token: string) {
    this.cookie.set('accessToken',token)
  }1

  getToken(): string {
    return this.cookie.get('accessToken')
  }

  logout(){

    this.onAuthChange$.next(null);
    this.cookie.delete('current')
    this.cookie.delete('accessToken')
    this.setLoggedIn(false)
    sessionStorage.removeItem('isUserLoggedIn')
    this.isUserAvailable.emit(false)
  }
  get isLoggedIn() {
    return sessionStorage.getItem('isUserLoggedIn') === 'true'?true:false
  }

}