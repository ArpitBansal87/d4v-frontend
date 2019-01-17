import { AuthService } from './../auth.service';
import { CredentialsService } from './credentials.service';
import { Subject } from 'rxjs';
import { RoleService } from './role.service';
import { BloodRequest } from './../typeFiles/blood-request';
import { BloodReqeustService } from './blood-reqeust.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RolesFormat } from '../typeFiles/returnFormat/roles-format';
import { UserDetails } from '../typeFiles/user-details';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _bloodRequestList: BehaviorSubject<[BloodRequest]> = new BehaviorSubject<any> ([]) ;
  private _roleList: BehaviorSubject<[RolesFormat]> = new BehaviorSubject<any> ([]) ;
  private _allUserList: BehaviorSubject<[UserDetails]> = new BehaviorSubject<any>([]);
  bloodRequestList = this._bloodRequestList.asObservable();
  roleListValue = this._roleList.asObservable();
  allUsersListValue = this._allUserList.asObservable();
  public changeLoadingIcon: Subject <Boolean>;
  
  
  constructor(private dataService: BloodReqeustService,private roleService: RoleService,
    private credentialServiceObj: CredentialsService, private authServiceObj: AuthService) {
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

  getAllUsersList(){
    this.credentialServiceObj.getAllUsers().subscribe(dataResponse => {
      this._allUserList.next(dataResponse)
    })
  }

  setRoleList(roleString:string){
    this.credentialServiceObj.setRole(roleString).subscribe(
      dataResponse => {
        console.log("after resposne");
        this.getAllUsersList()
      }
    );
  }

  removeRoleMapping(roleMappingId:string){
    this.credentialServiceObj.deleteRole(roleMappingId).subscribe(
      dataResponse => {
        this.getAllUsersList()
      }
    );
  }

  inititateLoadingIcon(){
    this.changeLoadingIcon.next(true)
  }

  initiateCloseLoadingIcon(){
    this.changeLoadingIcon.next(false)
  }

  isUserAdmin(){
    return (this.authServiceObj.isLoggedIn &&
      this.authServiceObj.getCurrentUser() != null &&
      this.authServiceObj.getCurrentUser().roleValue.includes('Admin')) ? true : false
  }

  isUserOnBRTeam(){
    return (this.authServiceObj.isLoggedIn &&
      this.authServiceObj.getCurrentUser() != null &&
      (this.authServiceObj.getCurrentUser().roleValue.includes('Admin') ||
      this.authServiceObj.getCurrentUser().roleValue.includes('BloodRequestModerator'))) ? true : false

  }
}
