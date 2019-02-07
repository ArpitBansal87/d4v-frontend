import { CommonDataService } from './core/dataServices/common-data.service';
import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'D4V';
  isLoadingIconReq: Boolean = false;

  constructor(private cookieHandler: CookieService, private titleService: Title,
    private commonService: CommonDataService ) {
      this.commonService.changeLoadingIcon.subscribe(data => {
        this.isLoadingIconReq = data;
      });
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.commonService.inititateLoadingIcon();
  }

  ngOnDestroy() {
    this.cookieHandler.deleteAll();
  }

}
