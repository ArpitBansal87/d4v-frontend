import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loginModel } from '../user-model-class'
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import { UserDetails} from '../core/user-details'


@Component({
  selector: 'app-loginmodule',
  templateUrl: './loginmodule.component.html',
  styleUrls: ['./loginmodule.component.scss']
})
export class LoginmoduleComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }
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
          console.log("test");
        }
        else
          console.log("else  part");
        this.data.getCustomerDetails(this.$loginResponse).subscribe(data => {
          this.$userDetails = data;
          if(this.$userDetails != null){
            console.log("test line");
            this.router.navigate(['home']);
          }
        });
      })
  }

  isRoleVisible(){
    console.log("inside isRoleVisible");
    return(this.$userDetails.role === 'undefined');
  }
}
