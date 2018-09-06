import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  private bloodRequestList: BloodRequest[] = []
  addRequestForm: FormGroup
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder,) { }

  ngOnInit() {
    this.data.getBloodRequestList().subscribe( dataResponse => {
      console.log(dataResponse)
      let requestList = dataResponse as BloodRequest[]
      console.log(requestList)
      return this.bloodRequestList;
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
    console.log(this.addRequestForm.value)
  }
}
