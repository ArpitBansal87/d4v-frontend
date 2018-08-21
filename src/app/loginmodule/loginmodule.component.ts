import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loginModel } from '../user-model-class'
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import { UserDetails} from '../core/user-details'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-loginmodule',
  templateUrl: './loginmodule.component.html',
  styleUrls: ['./loginmodule.component.scss']
})
export class LoginmoduleComponent implements OnInit {

  constructor(private data: DataService, private router: Router,private auth: AuthService) { }
  model = new loginModel("test1","test1");
  $loginResponse: any;
  $userDetails: UserDetails;
  ngOnInit() {
  }

  onSubmit(){
    let userModelClassExample = new loginModel("test1", "test1");
    console.log("testValue "+this+" value ");

    this.data.loginUser(this.model)
      .subscribe( data => {
        this.$loginResponse = data;
        if(data != null){
          console.log("test user logged in");
          this.auth.setToken(data.id);
          this.auth.setLoggedIn(true)
          this.data.getCustomerDetails(this.$loginResponse).subscribe(data => {
            this.$userDetails = data;
            if(this.$userDetails != null){
              console.log("set the value for user details object");
              this.auth.setUser(this.$userDetails);
              this.router.navigate(['home']);
            }
          });
        }
        else
          console.log("else  part");
        
      })
  }

  logoutUser(){
    this.data.logoutUser();
    this.auth.logout();
  }
}
