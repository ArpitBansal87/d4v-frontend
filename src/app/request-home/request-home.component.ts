import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  private bloodRequestList: BloodRequest[] = []
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getBloodRequestList().subscribe( dataResponse => {
      console.log(dataResponse.toString)
      let requestList = dataResponse as BloodRequest[]
      console.log(requestList)
      return this.bloodRequestList;
    })
  }

}
