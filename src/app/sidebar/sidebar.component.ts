import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CredentialsService } from '../core/dataServices/credentials.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string
  loggedIn: boolean

  constructor(private router: Router, private auth: AuthService, private dataService: CredentialsService) {
    router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url != undefined)
          this.currentUrl = _.url;
      }
    )
    this.auth.isUserAvailable.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn
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
}
