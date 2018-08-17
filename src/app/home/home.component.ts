import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) { }

  model: any;
  ngOnInit() {
    this.model = this.data.getUserDetails();
  }

}
