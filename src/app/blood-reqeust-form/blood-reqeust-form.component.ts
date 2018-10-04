import { Component, OnInit, Input, Directive, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from '../core/directives/constants';
import { UserDetails } from '../core/typeFiles/user-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blood-reqeust-form',
  templateUrl: './blood-reqeust-form.component.html',
  styleUrls: ['./blood-reqeust-form.component.scss']
})

@Directive({
  selector: '[blood-requests]'
})
export class BloodReqeustFormComponent implements OnInit {

  @Input ()
  dataValue:BloodRequest;
  @Output () 
  removeEvent = new EventEmitter();
  
  addRequestForm: FormGroup
  bloodGroups = constants.bloodGroups
  currentDate = new Date()
  isRequestFormVisible = true
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder, 
    private auth: AuthService, public viewContainerRef: ViewContainerRef,
    private router: Router) { }

  ngOnChange(){
    this.setDataFormValue();
  }

  removeFunction($event){
    if($event.target.attributes.role != undefined)
      if($event.target.attributes.role.value == 'dialog')
      this.removeEvent.emit()
  }

  ngOnInit() {
    if(this.dataValue == undefined){
      console.log("test line inside the data value")
      let mintime = new Date()
      mintime.setHours(this.currentDate.getHours()+1)
      this.dataValue = new BloodRequest(
        '',1,'','',mintime,
        '',false,'', 9999999999,
        '','','','',
        '','','','','','','',''
      )
    }
    this.setDataFormValue();  
  }

  setDataFormValue():void{
    this.addRequestForm = this.formBuilderObject.group({
      bloodType: [this.dataValue.bloodType, [Validators.required, Validators.maxLength(3)]],
      unitsRequired: [this.dataValue.unitsRequired, [Validators.required, Validators.min(1)]],
      purpose: [this.dataValue.purpose, []],
      patientName: [this.dataValue.patientName, []],
      requiredBy: [this.dataValue.requiredBy, [Validators.required]],
      hospitalName:[this.dataValue.hospitalName, [Validators.required]],
      attenderName: [this.dataValue.attenderName, [Validators.required]],
      attenderPhone: [this.dataValue.attenderPhone, [Validators.required]],
      status:[(this.dataValue.status == 'New')?'Edit':'New', [Validators.required]],
      hospitalAddressLine1: [this.dataValue.hospitalAddressLine1, [Validators.required]],
      hospitalAddressLine2: [this.dataValue.hospitalAddressLine2],
      hospitalAddressLine3: [this.dataValue.hospitalAddressLine3],
      hospitalCity: [this.dataValue.hospitalCity, [Validators.required]],
      hospitalState: [this.dataValue.hospitalState, [Validators.required]],
      hospitalPincode:[this.dataValue.hospitalPincode, [Validators.required]],
      createdByName:[this.dataValue.createdByName, [Validators.required]],
      createdById:[this.dataValue.createdById, [Validators.required]],
    })
  }

  addData() {
    this.addRequestForm.value.requiredBy = this.addRequestForm.value.requiredBy.toDate()
    let usrdet: UserDetails = this.auth.getCurrentUser()
    this.addRequestForm.value.createdByName = usrdet.firstName + " " + usrdet.lastName
    this.addRequestForm.value.createdById = usrdet.id
    this.data.addBloodRequest(this.addRequestForm.value).subscribe(data => {
      console.log("test line: " + data)
      this.router.navigate(['\home'])
    },
    error => {
      console.log(error)
    }
    )
  }

}
