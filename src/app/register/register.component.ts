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
  bloodTypes = ['A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-' ];
  
  model = new RegisterationDetails("test","tes","tes","tes","tes");

  constructor(private fb: FormBuilder,private data: DataService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      bloodType: ['AB-',[Validators.required]]
    })
    this.registrationForm.valueChanges.subscribe(console.log)
  }
  get userName(){
    return this.registrationForm.get('userName');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get bloodType(){
    return this.registrationForm.get('bloodType');
  }

  registerUser(){
    console.log("test line inside registeruser");
    console.log(this.registrationForm.value);
    this.model = new RegisterationDetails(this.registrationForm.value.username,
    this.registrationForm.value.password,
    this.registrationForm.value.bloodType,
    this.registrationForm.value.email,
    'test');
    this.data.registerUser(this.model).subscribe( data => {
      console.log("register call placed");
      if(data.id != 'undefined'){
        console.log("registration successfull");
      }
      else 
        console.log("registration unsuccessfull");
    });
  }
}
