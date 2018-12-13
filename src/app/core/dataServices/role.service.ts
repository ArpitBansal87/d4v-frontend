
import { RolesFormat } from './../typeFiles/returnFormat/roles-format';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient  ) { }

  getAllRoles():Observable<[RolesFormat]>{
    return this.http.get<[RolesFormat]>(environment.serverUrl+'roles')
  }

}
