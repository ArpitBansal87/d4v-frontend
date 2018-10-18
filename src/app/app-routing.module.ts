import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginmoduleComponent} from './loginmodule/loginmodule.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginmoduleComponent
  },
  {
    path: 'login',
    component: LoginmoduleComponent
  },
  {
    path: 'login/:registrationStatus',
    component: LoginmoduleComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
