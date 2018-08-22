import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'd4V Blood support';

  constructor(private cookieHandler: CookieService ){}

  ngOnDestroy(){
    this.cookieHandler.deleteAll();
  }
}