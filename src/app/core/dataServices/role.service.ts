import { AuthService } from './../auth.service';

import { RolesFormat } from './../typeFiles/returnFormat/roles-format';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { requestConstants } from './requestConstants';
import { setRoleFormat } from '../typeFiles/requestFormat/setRoleFormat';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  accessTokenObj: string

  constructor(private http: HttpClient, private httpOptions: requestConstants, private authServiceObj: AuthService  ) {
    this.accessTokenObj = this.authServiceObj.getToken()
   }

  getAllRoles():Observable<[RolesFormat]>{
    return this.http.get<[RolesFormat]>(environment.serverUrl+
      this.httpOptions.ROLE_PLURAL_MODEL_CONSTANT)
  }
 
}
