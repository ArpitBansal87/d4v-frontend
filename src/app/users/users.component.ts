import { DataTableComponent } from './data-table/data-table.component';
import { CommonDataService } from './../core/dataServices/common-data.service';
import { RolesFormat } from './../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../core/typeFiles/user-details';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CredentialsService } from '../core/dataServices/credentials.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(DataTableComponent) appDataTable:DataTableComponent
  public userDetailsList: UserDetails[] = []
  isUserDetailsListEmpty: boolean = false
  public roleList: RolesFormat[]= []
  showUserDetails: boolean = false
  userDetailsElement: UserDetails 
  
  constructor(private data: CredentialsService, private commonData: CommonDataService ) { }

  ngOnInit() {
    this.data.getAllUsers().subscribe((dataResponse:[UserDetails]) => {
      console.log("inside subscribe for getallusers")
      this.userDetailsList = dataResponse as UserDetails[]
      this.isUserDetailsListEmpty = true
      this.userDetailsElement = this.userDetailsList[0]
    });
    this.commonData.roleListValue.subscribe(dataResponse => {
      console.log("inside rolelist: "+dataResponse);
      this.roleList = dataResponse as RolesFormat[]
    });
    this.commonData.getRolesList()
    
  }

  initiateDetailsCard(idValue){
    this.userDetailsElement = null;
    this.showUserDetails = false;
    setTimeout(()=>
    {
      this.userDetailsElement = this.userDetailsList.filter(function (element,index,array){
        return (element.id == idValue)
      })[0]
      this.showUserDetails = true
    },0)
    
  }

 

}
