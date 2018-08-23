import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../core/data.service';
import {Router} from "@angular/router";

import { RegisterationDetails } from '../core/typeFiles/registeration-details'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup; 
  bloodGroups = ['A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-' ];
  
  constructor(private fb: FormBuilder,private data: DataService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      
      lastName: ['',[Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      bloodGroup: ['AB-',[Validators.required]],
      areaCode: ['',[Validators.required]],
      contactNo: ['',[Validators.required]]
    })
    
    this.registrationForm.valueChanges.subscribe(console.log)
  }
  get username(){
    return this.registrationForm.get('username');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  // get middleName(){
  //   return this.registrationForm.get('middleName');
  // }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get bloodGroup(){
    return this.registrationForm.get('bloodGroup');
  }

  get areaCode(){
    return this.registrationForm.get('areaCode');
  }

  get contactNo(){
    return this.registrationForm.get('contactNo');
  }
  registerUser(){
    console.log("test line inside registeruser");
    console.log(this.registrationForm.value);
    this.data.registerUser(this.registrationForm.value).subscribe( data => {
      console.log("register call placed");
      if(data.id != 'undefined'){
        console.log("registration successfull");
      }
      else 
        console.log("registration unsuccessfull");
    });
  }
}
