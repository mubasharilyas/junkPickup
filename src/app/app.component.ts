import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd } from "@angular/router";

// import {Component} from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
// import {WebcamImage} from 'ngx-webcam';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {




  constructor(public api: ApiService, public http: HttpClient,private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd && !event.url.includes('order-items/') && !event.url.includes('admin-dashboard')) {
        this.api.updatePaginationSub({ page: 1 , search: { property:'c.name',value:'Sofa'} })

      }
    });
  }
  title = 'junkPickup';
  ngOnInit() {
   
  }

}

