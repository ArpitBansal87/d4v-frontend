import { BloodReqeustService } from './../core/dataServices/blood-reqeust.service';
import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from '../core/directives/constants';
import { UserDetails } from '../core/typeFiles/user-details';
import { Router } from '@angular/router';
import { CommonDataService } from '../core/dataServices/common-data.service';

@Component({
  selector: 'app-blood-reqeust-form',
  templateUrl: './blood-reqeust-form.component.html',
  styleUrls: ['./blood-reqeust-form.component.scss']
})

export class BloodReqeustFormComponent implements OnInit, OnDestroy {

  @Input()
  public dataValue: BloodRequest;

  @Output()
  public removeEvent = new EventEmitter()

  addRequestForm: FormGroup
  bloodGroups = constants.bloodGroups
  currentDate = new Date()
  minDateValue = new Date()
  isRequestFormVisible = true
  isEditRequest: Boolean

  constructor(private dataService: BloodReqeustService, private formBuilderObject: FormBuilder,
    private auth: AuthService, public viewContainerRef: ViewContainerRef,
    private router: Router, private commonData: CommonDataService) { }

  removeFunction($event) {
    
    if ($event.target.attributes.role != undefined)
      if ($event.target.attributes.role.value == 'dialog'
        || $event.target.attributes.role.value == 'closeModal')
        this.removeEvent.emit()
  }

  initiateClose() {
    this.removeEvent.emit();    
  }

  ngOnInit() {
    if (Object.keys(this.dataValue).length === 0) {
      this.isEditRequest = false
      let mintime = new Date()
      mintime.setHours(this.currentDate.getHours() + 1)
      this.minDateValue = mintime;
      this.dataValue = new BloodRequest(
        '', 1, '', '', mintime,
        '', false, '', 9999999999,
        '', '', '', '',
        '', '', '', '', '', [''], '',''
      )
    }
    else {
      this.isEditRequest = true
      this.minDateValue = this.dataValue.requiredBy
    }
    this.setDataFormValue();
  }

  ngOnDestroy(): void {
    
  }

  setDataFormValue(): void {
    this.addRequestForm = this.formBuilderObject.group({
      bloodType: [this.dataValue.bloodType, [Validators.required, Validators.maxLength(3)]],
      unitsRequired: [this.dataValue.unitsRequired, [Validators.required, Validators.min(1)]],
      purpose: [this.dataValue.purpose, []],
      patientName: [this.dataValue.patientName, []],
      requiredBy: [this.dataValue.requiredBy, [Validators.required]],
      hospitalName: [this.dataValue.hospitalName, [Validators.required]],
      attenderName: [this.dataValue.attenderName, [Validators.required]],
      attenderPhone: [this.dataValue.attenderPhone, [Validators.required]],
      status: [(this.dataValue.status == '') ? 'New' : 'Edit', [Validators.required]],
      hospitalAddressLine1: [this.dataValue.hospitalAddressLine1, [Validators.required]],
      hospitalAddressLine2: [this.dataValue.hospitalAddressLine2],
      hospitalAddressLine3: [this.dataValue.hospitalAddressLine3],
      hospitalCity: [this.dataValue.hospitalCity, [Validators.required]],
      hospitalState: [this.dataValue.hospitalState, [Validators.required]],
      hospitalPincode: [this.dataValue.hospitalPincode, [Validators.required]],
      createdByName: [this.dataValue.createdByName, [Validators.required]],
      createdById: [this.dataValue.createdById, [Validators.required]],
      moderatorsInvolved: [this.dataValue.moderatorsInvolved, []],
      changeId: [this.dataValue.changeId, []],
      id: [this.dataValue.id,[Validators.required]]
    })
  }

  addData() {
    this.addRequestForm.value.requiredBy = this.addRequestForm.value.requiredBy.toDate()
    let usrdet: UserDetails = this.auth.getCurrentUser()
    this.addRequestForm.value.createdByName = usrdet.firstName + " " + usrdet.lastName
    this.addRequestForm.value.createdById = usrdet.id
    this.dataService.addBloodRequest(this.addRequestForm.value).subscribe(data => {
      this.commonData.getBloodRequestData()
    },
      error => {
        console.log(error)
      })
    this.triggerClick()
  }

  submitEditedData() {
    this.dataService.editBloodRequest(this.addRequestForm.value).subscribe(data => {
      this.triggerClick()
      this.commonData.getBloodRequestData()
      }, 
      error => {
        console.log('Error Value: ' + error)
      })
  }

  @ViewChild('closebutton') closeButton: ElementRef;
  triggerClick() {
    let el: HTMLElement = this.closeButton.nativeElement as HTMLElement
    el.click()
  }

}
