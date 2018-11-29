import { UserDetails } from './../core/typeFiles/user-details';
import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../core/dataServices/credentials.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userDetailsList: UserDetails[] = []
  isUserDetailsListEmpty: boolean = false

  constructor(private data: CredentialsService) { }

  ngOnInit() {
    this.data.getAllUsers().subscribe(dataResponse => {
      this.userDetailsList = dataResponse as UserDetails[]
      this.isUserDetailsListEmpty = true
    });
  }

}
