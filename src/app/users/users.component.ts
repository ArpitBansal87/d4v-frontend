import { DataTableComponent } from './data-table/data-table.component';
import { CommonDataService } from './../core/dataServices/common-data.service';
import { RolesFormat } from './../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../core/typeFiles/user-details';
import { Component, OnInit, ViewEncapsulation, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { CredentialsService } from '../core/dataServices/credentials.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {

  @ViewChild(DataTableComponent) appDataTable:DataTableComponent
  public userDetailsList: UserDetails[] = []
  isUserDetailsListEmpty: boolean = true
  public roleList: RolesFormat[]= []
  showUserDetails: boolean = false
  userDetailsElement: UserDetails 
  
  constructor(private data: CredentialsService, private commonData: CommonDataService ) { }

  ngOnInit() {
    this.commonData.getRolesList()
    this.commonData.getAllUsersList()
    this.commonData.allUsersListValue.subscribe(dataResponse => {
      this.userDetailsList = dataResponse as UserDetails[]
      this.isUserDetailsListEmpty = false
    })
     this.commonData.roleListValue.subscribe(dataResponse => {
      this.roleList = dataResponse as RolesFormat[]
    })        
  }

  ngAfterViewInit(){ }

  ngOnChanges(){ }

  initiateDetailsCard(idValue:string){
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
