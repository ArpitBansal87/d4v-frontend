import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'D4V';

  constructor(private cookieHandler: CookieService, private titleService: Title ){}

  ngOnInit(){
    this.titleService.setTitle(this.title)
  }
  ngOnDestroy(){
    this.cookieHandler.deleteAll();
  }
}