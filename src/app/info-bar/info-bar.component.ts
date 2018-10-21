import { BloodReqeustService } from './../core/dataServices/blood-reqeust.service';
import { Component, OnInit } from '@angular/core';
import { CountResponse } from '../core/typeFiles/returnFormat/count-response';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

  totalBloodRequests: number
  activeBloddRequests: number

  constructor(private dataService: BloodReqeustService) { }

  ngOnInit() {
    this.dataService.getTotalBloodRequestsCount('').subscribe(jsonResponse => {
      let countResponseObj: CountResponse = jsonResponse as CountResponse
      this.totalBloodRequests = countResponseObj.count
    })
    this.dataService.getTotalBloodRequestsCount('active').subscribe(jsonResponse => {
      let countResponseObj: CountResponse = jsonResponse as CountResponse
      this.activeBloddRequests = countResponseObj.count
    })
  }

}
