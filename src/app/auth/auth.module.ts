import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';

import {AuthRoutingModule} from './auth-routing.module';
import {CommonModule} from '@angular/common';
import {CommonFormModule} from '../common/commonForm.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonFormModule
  ]
})

export class AuthModule {

}
