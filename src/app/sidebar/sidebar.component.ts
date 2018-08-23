import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string
  loggedIn: boolean

  constructor(private router: Router, private auth: AuthService) {
    router.events.subscribe(
      (_: NavigationEnd) => this.currentUrl = _.url
    )
    this.auth.isUserAvailable.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn
      console.log("change in login status: " + this.loggedIn)
    })
    
   }

  ngOnInit() {
  }

  logoutUser(){
    this.auth.logout()
  }
}
