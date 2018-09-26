import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { BloodRequest } from '../core/typeFiles/blood-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from '../core/directives/constants';
import { UserDetails } from '../core/typeFiles/user-details';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.scss']
})
export class RequestHomeComponent implements OnInit {

  private bloodRequestList: BloodRequest[] = []
  isNewFormVisible = false
  openforEdit= false
  formData:BloodRequest
  
  constructor(private data: DataService, private formBuilderObject: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.data.getBloodRequestList().subscribe( dataResponse => {
      this.bloodRequestList = dataResponse as BloodRequest[]
      let testVar = this.auth.getCurrentUser()
      console.log("inside getBloodRequestList")
    })
  }
 
  showBRform(dataFormValue,indexValue){
    console.log("this is the value for edit current form: "+indexValue)
    if(indexValue == -1)
      this.formData = <BloodRequest>{}
    else
      this.formData = dataFormValue
    this.isNewFormVisible = !this.isNewFormVisible
  }

}
