import {Injectable} from '@angular/core';
import {UserDetails} from "./typeFiles/user-details";
import {isNullOrUndefined} from "util";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  public onAuthChange$: Subject<UserDetails>
  private isLoggedInStatus: boolean

  constructor() {
    this.onAuthChange$ = new Subject();
  }

  setLoggedIn(value: boolean){
      this.isLoggedInStatus =  value;
  }

  setUser(user: UserDetails) {

    console.log("current user setup");

    this.onAuthChange$.next(user);

    let userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);

  }

  getCurrentUser(): UserDetails {

    let userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      let user: UserDetails = JSON.parse(userString);

      return user;
    } else {

      return null;
    }
  }

  setToken(token: string) {

    localStorage.setItem("accessToken", token);
  }

  getToken(): string {

    return localStorage.getItem("accessToken");
  }

  logout(){

    this.onAuthChange$.next(null);
    // we need also request logout to the server api
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");

  }
  get isLoggedIn() {
    return this.isLoggedInStatus
  }

}