import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenServiceService } from './jwttoken-service.service';
import { AppCookieServiceService } from './app-cookie-service.service';
//import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
      //private loginService: LoginService,
              private authStorageService: AppCookieServiceService,
              private jwtService: JWTTokenServiceService,
      private router : Router
      ) {
  }
 canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Promise<boolean>{

      if (this.authStorageService.get('token')){
          if (this.jwtService.tokenExpired(this.authStorageService.get('token'))) {
              // Should Redirect Sig-In Page
              this.router.navigate(['/login']);
              return false;
          }
          return true
      }
     this.router.navigate(['/login']);
      return false;

  }
}
