import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AlertService} from "ngx-alerts";
import {AppCookieServiceService} from "../../services/app-cookie-service.service";
import {JWTTokenServiceService} from "../../services/jwttoken-service.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alertService : AlertService,
    private storeCookie : AppCookieServiceService,
    private jwtservice : JWTTokenServiceService,
  ) {
  }

  ngOnInit() {
    if (this.api.getData('token')) {
      this.router.navigate(['post']);
    }
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    let credentials = {
      username : this.f['fullname'].value,
      email : this.f['email'].value,
      password : this.f['password'].value
    }
    this.api.signup(credentials).subscribe(res =>{
      if (res['token']){
        //this.api.setData(res['token'],'token')
        // setting cookie and jwt token
        this.storeCookie.set('token',res['token'])
        this.jwtservice.setToken(res['token'])

        this.alertService.success('Signup Successfull');

        setTimeout(()=>{
          this.router.navigate(['dashboard']);

        },2000)
      }
      else if (res['msg']){
        this.alertService.warning(res['msg']);
      }
    }, error => {
      if (error.error.errors){
        error.error.errors.forEach((value,index)=>{
          console.log(value.msg)
          this.alertService.danger(value.msg);
        })
      }
    })
  }
}
