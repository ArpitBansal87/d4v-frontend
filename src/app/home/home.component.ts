import { CommonDataService } from 'src/app/core/dataServices/common-data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,private commonDataServiceObj: CommonDataService) {}
  isUserLoggedIn = false;
  model: any;
  ngOnInit() {
    this.model = this.auth.getCurrentUser();
    this.isUserLoggedIn = this.auth.isLoggedIn;
    //this.commonDataServiceObj.initiateCloseLoadingIcon();
  }

  ngAfterViewInit(){
    console.log("inside the home component ");
    setTimeout(() => {this.commonDataServiceObj.initiateCloseLoadingIcon(); });
  }

}
