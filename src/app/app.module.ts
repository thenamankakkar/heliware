import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AlertModule} from "ngx-alerts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JWTTokenServiceService} from "./services/jwttoken-service.service";
import {AppCookieServiceService} from "./services/app-cookie-service.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000}),
      BrowserAnimationsModule,
      JWTTokenServiceService,
      AppCookieServiceService,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
