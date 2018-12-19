import { Subject } from 'rxjs';
import { RoleService } from './role.service';
import { BloodRequest } from './../typeFiles/blood-request';
import { BloodReqeustService } from './blood-reqeust.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RolesFormat } from '../typeFiles/returnFormat/roles-format';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _bloodRequestList: BehaviorSubject<[BloodRequest]> = new BehaviorSubject<any> ([]) ;
  private _roleList: BehaviorSubject<[RolesFormat]> = new BehaviorSubject<any> ([]) ;
  bloodRequestList = this._bloodRequestList.asObservable();
  roleListValue = this._roleList.asObservable();
  public changeLoadingIcon: Subject <Boolean>;
  
  
  constructor(private dataService: BloodReqeustService,private roleService: RoleService) {
    this.changeLoadingIcon = new Subject();
   }

  getBloodRequestData(){
    this.dataService.getBloodRequestList().subscribe( dataResponse => {
      this._bloodRequestList.next(dataResponse)
    })
  }

  getRolesList(){
    this.roleService.getAllRoles().subscribe(
      dataResponse => {
        this._roleList.next(dataResponse)
      }
    )
  }

  inititateLoadingIcon(){
    this.changeLoadingIcon.next(true)
  }

  initiateCloseLoadingIcon(){
    this.changeLoadingIcon.next(false)
  }
}
