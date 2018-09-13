import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from '../core/directives/constants';
import { UserDetails } from '../core/typeFiles/user-details';

@Component({
  selector: 'app-blood-reqeust-form',
  templateUrl: './blood-reqeust-form.component.html',
  styleUrls: ['./blood-reqeust-form.component.scss']
})
export class BloodReqeustFormComponent implements OnInit {

  addRequestForm: FormGroup
  bloodGroups = constants.bloodGroups
  currentDate = new Date()
  isRequestFormVisible = true
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
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
    let usrdet: UserDetails = this.auth.getCurrentUser();
    this.addRequestForm.value.createdBy = usrdet.firstName + " " + usrdet.lastName
    this.data.addBloodRequest(this.addRequestForm.value).subscribe(data =>{
      console.log("test line: "+data)
    })
  }

}
