import { LoginModelResponseClass } from './../typeFiles/login-model-response-class';
import { Injectable } from '@angular/core';
import { requestConstants } from './requestConstants';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { loginModel } from '../typeFiles/user-model-class';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http: HttpClient, private httpOptions: requestConstants) { }

  $userDetails: any;
  
  isUserLoggedIn(){
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getUser(userId) {
    return this.http.get(environment.serverUrl +userId);
  }

  getUserDetails(){
    return this.$userDetails;
  }

  loginUser(user:loginModel):Observable<any>{
    return this.http.post(environment.serverUrl +'credentials/login',
     user, this.httpOptions.postHttpOption).pipe(
      map(response => response),
      catchError((err, caught) => {
        let errorVariable = err.error
        this.handleError(err)
        return throwError(errorVariable)
      })
    );
  }

  registerUser(registerForm:any):Observable<any>{
    return this.http.post(environment.serverUrl +'credentials',
    registerForm, this.httpOptions.postHttpOption).pipe(map(response => response));
  }

  getCustomerDetails(user:LoginModelResponseClass):Observable<any>{
    
      return this.http.get(environment.serverUrl +'credentials/'
          +user.userId+'?access_token='+user.id)
      .pipe(map(response => {
        this.$userDetails = response;
        return response;
      }));
  }  

  logoutUser(){
    return this.http.get(environment.serverUrl +'credentials/logout');
  }

  getAllUsers(){
    return this.http.get(environment.serverUrl+'credentials?filter[include]=roles');
  }

}
