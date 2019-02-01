import { AuthService } from './../auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { requestConstants, } from './requestConstants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloodReqeustService {

  accessTokenObj = '';

  constructor(private http: HttpClient, private httpOptions: requestConstants,
    private authServiceObj: AuthService) {
      this.accessTokenObj = this.authServiceObj.getToken();
    }

  getBloodRequestList(): Observable<any> {
    return this.http.get(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT);
  }

  addBloodRequest(addRequestForm: any): Observable<any> {
    const requestId = addRequestForm.id;
    delete addRequestForm.id;
    return this.http.post(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT
    , addRequestForm, this.httpOptions.postHttpOption).pipe(map(response => {
      return response;
    }));
  }

  editBloodRequest(editRequestForm: any): Observable<any> {
    const requestId = editRequestForm.id;
    delete editRequestForm.id;
    return this.http.put(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT
      + this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT + requestId
    , editRequestForm, this.httpOptions.postHttpOption).pipe(map(response => {
      return response;
    }),
    catchError((err, caught) => {
      const errorVariable = err.error;
      return throwError(errorVariable);
    }));
  }

  getBloodRequest() {
    return this.http.get(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT);
  }

  getTotalBloodRequestsCount(filterValue) {
    const whereClause = (filterValue.length == 0) ? '' : '?where={"status":{"neq":"Edit"}}';
    return this.http.get(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT + '/count' + whereClause);
  }

  deleteBloodRequest(bloodRequetId) {
    return this.http.delete(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT +
      this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT + bloodRequetId);
  }

  getBloodRequestStates() {
    return this.http.get(environment.serverUrl + 'blood-request-statuses' +
    this.httpOptions.QUESTION_SYMBOL_CONSTANT + this.httpOptions.ACCESS_TOKEN_CONSTANT +
    this.httpOptions.EQUAL_SYMBOL + this.authServiceObj.getToken()
    );
  }

  setBloodRequestStatus(idValue: string): Observable<any> {
    const bloodMappingDetails: string[] = idValue.split('-');
    const bloodMappingObj = {
      'principalType': 'BloodRequest',
      'principalId': bloodMappingDetails[1],
      'createdDate': new Date()
    };
    return this.http.put(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_PLURAL_CONSTANT
      + this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT + bloodMappingDetails[1] + this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT
      + this.httpOptions.BLOOD_REQUESTS_STATUS_PLURAL_CONSTANT + this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT
      + this.httpOptions.REL_CONSTANTS + this.httpOptions.FORWARD_SLASH_SYMBOL_CONSTANT + bloodMappingDetails[0]
      + this.httpOptions.QUESTION_SYMBOL_CONSTANT + this.httpOptions.ACCESS_TOKEN_CONSTANT + this.httpOptions.EQUAL_SYMBOL
      + this.accessTokenObj, bloodMappingObj).pipe(
        map(reponse => reponse), catchError((err, caught) => {
          const errorVariable = err.error;
          console.log(err.error);
          return throwError(errorVariable);
        }
        ));
  }


  getlatestBloodRequestStatus(idValue: string): Observable<any> {
    const filterJson = 'filter={"order":"createdDate DESC","limit":1,"where":{"bloodRequestId":"' + idValue + '"}}';

    return this.http.get(environment.serverUrl + this.httpOptions.BLOOD_REQUESTS_STATUS_MAPPING_PLURAL_CONSTANT
      + this.httpOptions.QUESTION_SYMBOL_CONSTANT + filterJson).pipe(
        map(response => response), catchError((err, caught) => {
          const errorVariable = err.error;
          console.log(err.error);
          return throwError(errorVariable);
        }
        ));

  }
}
