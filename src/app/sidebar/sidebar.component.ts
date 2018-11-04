import { userDetailsClass } from './../core/typeFiles/user-details-model-class';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CredentialsService } from '../core/dataServices/credentials.service';
import { UserDetails } from '../core/typeFiles/user-details';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string
  loggedIn: boolean
  isCoreMemebr: boolean
  private userObj: UserDetails

  constructor(private router: Router, private auth: AuthService, private dataService: CredentialsService) {
    router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url != undefined)
          this.currentUrl = _.url;
      }
    )

    if (this.auth.isLoggedIn) {
      this.verifyUser()
    }
    this.auth.isUserAvailable.subscribe(isLoggedIn => {
      this.verifyUser()      
    })

    this.loggedIn = this.auth.isLoggedIn;
  }

  ngOnInit() {
  }

  logoutUser() {
    this.auth.logout()
    this.dataService.logoutUser()
    this.loggedIn = this.auth.isLoggedIn
  }

  setLoggedInUser() {

  }

  verifyUser() {
    this.loggedIn = this.auth.isLoggedIn
    this.userObj = this.auth.getCurrentUser()
    this.isCoreMemebr = (this.auth.isLoggedIn && this.userObj != null && this.userObj.role == 'member') ? true : false

  }
}
