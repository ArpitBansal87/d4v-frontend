import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loginModel } from '../core/typeFiles/user-model-class'
import { DataService } from '../core/data.service';
import {Router} from "@angular/router";
import { UserDetails} from '../core/typeFiles/user-details'
import { AuthService } from '../core/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-loginmodule',
  templateUrl: './loginmodule.component.html',
  styleUrls: ['./loginmodule.component.scss']
})
export class LoginmoduleComponent implements OnInit {

  loginForm:FormGroup

  constructor(private data: DataService, 
              private router: Router,
              private auth: AuthService,
              private cookie: CookieService,
              private fb: FormBuilder) { }
  model:any;
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
    this.loginForm.valueChanges.subscribe(console.log)

    if (sessionStorage.getItem('isUserLoggedIn') === 'true'){
      console.log("inside logged in ")
      if(this.cookie.get('isLoggedIn') === 'true')
        this.router.navigate(['\home'])
    }
  }

  submitLoginDetails(){
    this.data.loginUser(this.loginForm.value)
      .subscribe( data => {
        if(data != null){
          console.log("test user logged in");
          this.auth.setToken(data.id);
          this.auth.setLoggedIn(true)
          this.data.getCustomerDetails(data).subscribe(data => {
            if(data != null){
              console.log("set the value for user details object");
              this.auth.setUser(data);
              this.router.navigate(['home']);
            }
          });
        }
      })
  }

  logoutUser(){
    this.data.logoutUser();
    this.auth.logout();
  }
}
