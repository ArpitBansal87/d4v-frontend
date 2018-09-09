import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from '../core/directives/constants';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  private bloodRequestList: BloodRequest[] = []
  addRequestForm: FormGroup
  bloodGroups = constants.bloodGroups
  currentDate = new Date()
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder,) { }

  ngOnInit() {
    this.data.getBloodRequestList().subscribe( dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[]
      console.log("inside getBloodRequestList")
    })

    this.addRequestForm = this.formBuilderObject.group({
      bloodType:['',[Validators.required,Validators.maxLength(3)]],
      unitsRequired:['',[Validators.required,Validators.min(1)]],
      purpose:['',[]],
      patientName:['',[]],
      requiredBy: ['',[Validators.required]],
      attenderDetails:this.formBuilderObject.group({
        attenderName:['',[Validators.required]],
        attenderPhone:['',[Validators.required]]
      }),
      hospitalDetails: this.formBuilderObject.group({
        addressLine1:['',[Validators.required]],
        addressLine2:[],
        addressLine3:[],
        city:['',[Validators.required]],
        pincode:['',[Validators.required]],
        state:['',[Validators.required]],
        country:['',[Validators.required]]
      })
    })
  }

  addData(){
    this.addRequestForm.value.requiredBy = this.addRequestForm.value.requiredBy.toDate()
    this.addRequestForm.value.createdBy = "test"
    this.data.addBloodRequest(this.addRequestForm.value).subscribe(data =>{
      console.log("test line: "+data)
    })
  }
}
