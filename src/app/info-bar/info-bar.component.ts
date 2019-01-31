import { UserDetails } from './../core/typeFiles/user-details';
import { CredentialsService } from './../core/dataServices/credentials.service';
import { BloodReqeustService } from './../core/dataServices/blood-reqeust.service';
import { Component, OnInit } from '@angular/core';
import { CountResponse } from '../core/typeFiles/returnFormat/count-response';
import { AuthService } from '../core/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

  totalBloodRequests: number;
  activeBloddRequests: number;
  currentUrl: string;
  loggedIn: boolean;
  isCoreMemebr: boolean;
  private userObj: UserDetails;

  constructor(private dataService: BloodReqeustService, private auth: AuthService,
    private router: Router, private credService: CredentialsService) {
    router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url != undefined) {
          this.currentUrl = _.url;
        }
      }
    );

    if (this.auth.isLoggedIn) {
      this.verifyUser();
    }
    this.auth.isUserAvailable.subscribe(isLoggedIn => {
      this.verifyUser();
    });

    this.loggedIn = this.auth.isLoggedIn;
  }

  ngOnInit() {
    this.dataService.getTotalBloodRequestsCount('').subscribe(jsonResponse => {
      const countResponseObj: CountResponse = jsonResponse as CountResponse;
      this.totalBloodRequests = countResponseObj.count;
    });
    this.dataService.getTotalBloodRequestsCount('active').subscribe(jsonResponse => {
      const countResponseObj: CountResponse = jsonResponse as CountResponse;
      this.activeBloddRequests = countResponseObj.count;
    });
  }

  logoutUser() {
    this.auth.logout();
    this.credService.logoutUser();
    this.loggedIn = this.auth.isLoggedIn;
  }

  setLoggedInUser() {

  }

  verifyUser() {
    this.loggedIn = this.auth.isLoggedIn;
    this.userObj = this.auth.getCurrentUser();
    this.isCoreMemebr = (this.auth.isLoggedIn && this.userObj != null && this.userObj.role == 'member') ? true : false;

  }

}
