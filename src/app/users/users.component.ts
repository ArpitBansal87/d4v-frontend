import { CommonDataService } from './../core/dataServices/common-data.service';
import { RolesFormat } from './../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../core/typeFiles/user-details';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CredentialsService } from '../core/dataServices/credentials.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  public userDetailsList: UserDetails[] = []
  isUserDetailsListEmpty: boolean = false
  public roleList: RolesFormat[]= []
  showUserDetails: boolean = false
  userDetailsElement: UserDetails 

  constructor(private data: CredentialsService, private commonData: CommonDataService ) { }

  ngOnInit() {
    this.data.getAllUsers().subscribe((dataResponse:[UserDetails]) => {
      this.userDetailsList = dataResponse as UserDetails[]
      this.isUserDetailsListEmpty = true
      this.userDetailsElement = this.userDetailsList[0]
    });
    this.commonData.roleListValue.subscribe(dataResponse => {
      this.roleList = dataResponse as RolesFormat[]
    });
    this.commonData.getRolesList()
  }

  initiateDetailsCard(idValue){
    this.userDetailsElement = this.userDetailsList.filter(function (element,index,array){
      return (element.id == idValue)
    })[0]
    this.showUserDetails = true
  }

}
