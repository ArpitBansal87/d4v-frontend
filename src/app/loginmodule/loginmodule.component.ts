import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { loginModel } from '../core/typeFiles/user-model-class'
import { DataService } from '../core/data.service';
import {Router, ActivatedRoute} from "@angular/router";
import { UserDetails} from '../core/typeFiles/user-details'
import { AuthService } from '../core/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-loginmodule',
  templateUrl: './loginmodule.component.html',
  styleUrls: ['./loginmodule.component.scss'],
  animations:[
    trigger('wasRegistrationSuccess', [
      transition(':enter', [        
        animate('1s ease-in', keyframes([
          style({opacity: 0, transform: 'translate(-50%,-75%)', offset: 0}),
          style({opacity: .5, transform: 'translate(-50%,35px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translate(-50%,0)',     offset: 1.0}),
        ]))
      ]),
      transition(':leave', [
        animate('1s ease-in', keyframes([
          style({opacity: 1, transform: 'translate(-50%,0)', offset: 0}),
          style({opacity: .5, transform: 'translate(-50%,35px)',  offset: 0.3}),
          style({opacity: 0, transform: 'translate(-50%,-75%)',     offset: 1}),
        ]))
      ])
    ])
  ]
})
export class LoginmoduleComponent implements OnInit {

  loginForm:FormGroup
  model:any;
  wasRegistrationSuccess: boolean = false
  private sub: any
  goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];

  constructor(private data: DataService, 
              private router: Router,
              private auth: AuthService,
              private activeRoute: ActivatedRoute,
              private cookie: CookieService,
              private fb: FormBuilder) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
    // this.loginForm.valueChanges.subscribe(console.log)

    if (sessionStorage.getItem('isUserLoggedIn') === 'true'){
      
      if(this.cookie.get('isLoggedIn') === 'true')
        this.router.navigate(['\home'])

    }

    this.sub = this.activeRoute.params.subscribe((params) => {
      if(params.hasOwnProperty('registrationStatus')){
        if(params['registrationStatus'] === 'success'){
          this.wasRegistrationSuccess = true
          setTimeout(() => {
            this.wasRegistrationSuccess = false
          },3000)
        }
      }
      else
        this.wasRegistrationSuccess = false
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  switchAnimation(){
    this.wasRegistrationSuccess = this.wasRegistrationSuccess=== true ? false: true
  }

  submitLoginDetails(){
    this.data.loginUser(this.loginForm.value)
      .subscribe( data => {
        if(data != null){
          this.auth.setToken(data.id);
          this.auth.setLoggedIn(true)
          this.data.getCustomerDetails(data).subscribe(data => {
            if(data != null){
              this.auth.setUser(data);
              this.router.navigate(['home']);
            }
          });
        }
      })
  }
  removeItem(i) {
    this.goals.splice(i, 1);
  }
}
