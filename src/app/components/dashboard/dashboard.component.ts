import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router,private alertService: AlertService,) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['/login'],{replaceUrl : true});
    this.alertService.warning("Logout Successfull")
    document.cookie = `${'token'} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }
}
