import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {HttpModule} from '@angular/http';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './common/Services/user.service';
import {AuthService} from './common/Services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { SystemModule } from './system/system.module';
import { AuthGuard } from './common/Services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
		AppRoutingModule,
		SystemModule,
		BrowserAnimationsModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
