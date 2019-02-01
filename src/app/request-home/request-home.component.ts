import { BloodRequestStatus } from './../core/typeFiles/returnFormat/bloodRequestStates-reponse';
import { CommonDataService } from './../core/dataServices/common-data.service';
import { BloodReqeustService } from './../core/dataServices/blood-reqeust.service';
import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { BloodRequest } from '../core/typeFiles/blood-request';


@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  public bloodRequestList: BloodRequest[] = [];
  public totalBloodRequests: number;
  isNewFormVisible = false;
  openforEdit = false;
  public formData: BloodRequest;
  isUserOnBRTeam: Boolean;
  bloodRequestStates: BloodRequestStatus[] = [];


  constructor(private dataService: BloodReqeustService,
    private commonData: CommonDataService) { }

  ngOnInit() {
    this.commonData.bloodRequestList.subscribe(dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[];
      this.bloodRequestList.forEach((element) => {
        this.dataService.getlatestBloodRequestStatus(element.id).subscribe(dataResponse => {
          let responseObj = dataResponse as BloodRequestStatus;
          if (dataResponse.length != 0) {
          element.latestStatus = responseObj[0].bloodRequestStatusId + '-' + element.id;
          }
      });
      });

    });
    this.commonData.getBloodRequestData();
    this.isUserOnBRTeam = this.commonData.isUserOnBRTeam();
    this.dataService.getBloodRequestStates().subscribe(dataResponse => {
      this.bloodRequestStates = dataResponse as BloodRequestStatus[];
    });
  }

  ngAfterViewChecked() {
    this.commonData.initiateCloseLoadingIcon();
  }

  showBRform(dataFormValue, indexValue) {
    if (indexValue == -1) {
      this.formData = <BloodRequest>{};
    } else {
      this.formData = dataFormValue;
    }
    this.isNewFormVisible = !this.isNewFormVisible;
  }

  removeDialog() {
    this.dataService.getBloodRequestList().subscribe( dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[];
      this.isNewFormVisible = false;
    });
  }

  deleteBloodRequest(requestId) {
    this.dataService.deleteBloodRequest(requestId).subscribe( () => {
      this.commonData.getBloodRequestData();
    });
  }

  setBloodRequestStatus(event): void {
    const newVal = event.value;
    this.dataService.setBloodRequestStatus(newVal).subscribe( dataResponse => {
      console.log('test: ' + dataResponse);
    });
  }

}
