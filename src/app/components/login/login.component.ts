import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AlertService} from "ngx-alerts";
import {AppCookieServiceService} from "../../services/app-cookie-service.service";
import {JWTTokenServiceService} from "../../services/jwttoken-service.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        private alertService: AlertService,
        private storeCookie : AppCookieServiceService,
        private jwtservice : JWTTokenServiceService,
    ) {

    }

    ngOnInit() {
        console.log("iamcookietoekn",this.storeCookie.get('token'))

        if (this.api.getData('token')) {
            this.router.navigate(['post']);
        }
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
            password: ['', Validators.required]
        });

    }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    onSubmit() {
        let credentials = {
            email: this.f['email'].value,
            password: this.f['password'].value
        };
        console.log("iamclick",credentials)

        this.api.login(credentials).subscribe(res => {
            console.log("iamresponse",res)
            if (res['token']) {

                // setting cookie and jwt token
                this.storeCookie.set('token',res['token'])
                this.jwtservice.setToken(res['token'])

                //this.api.setData(res['token'], 'token')
                this.alertService.success('Login Successfull');

                setTimeout(()=>{
                    this.router.navigate(['dashboard']);

                },2000)
            } else if (res['message']) {
                this.alertService.warning(res['message']);
            }
            else if (res['errors']){
                res['errors'].forEach(value=>{
                    this.alertService.danger(value['msg']);
                })
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
