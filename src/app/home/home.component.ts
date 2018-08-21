import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService, private auth: AuthService) { }

  model: any;
  ngOnInit() {
    this.model = this.auth.getCurrentUser();
  }

}
