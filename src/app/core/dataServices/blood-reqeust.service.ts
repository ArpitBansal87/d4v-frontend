import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { requestConstants } from './requestConstants';
import { map, catchError } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class BloodReqeustService {

  constructor(private http: HttpClient, private httpOptions: requestConstants) { }

  getBloodRequestList(): Observable<any>{
    return this.http.get(environment.serverUrl +'bloodRequests')
  }

  addBloodRequest(addRequestForm:any):Observable<any>{
    let requestId = addRequestForm.id
    delete addRequestForm.id
    return this.http.post(environment.serverUrl +'bloodRequests'
    ,addRequestForm,this.httpOptions.postHttpOption).pipe(map(response => {
      return response;
    }));
  }

  editBloodRequest(editRequestForm:any):Observable<any>{
    let requestId = editRequestForm.id
    delete editRequestForm.id
    return this.http.put(environment.serverUrl +'bloodRequests/'+requestId
    ,editRequestForm,this.httpOptions.postHttpOption).pipe(map(response => {
      return response;
    }),
    catchError((err,caught) =>{
      let errorVariable = err.error
      return throwError(errorVariable)
    }));
  }

  getBloodRequest(){
    return this.http.get(environment.serverUrl +'bloodRequests')
  }

  getTotalBloodRequestsCount(filterValue){
    let whereClause = (filterValue.length == 0)?'':'?where={"status":{"neq":"Edit"}}'
    return this.http.get(environment.serverUrl + 'bloodRequests' + '/count'+whereClause)
  }
}
