import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationStart } from "@angular/router";

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




  constructor(public api: ApiService, public http: HttpClient, private spinner: NgxSpinnerService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart && !event.url.includes('order-items/')) {
        this.api.updatePaginationSub({ page: 1 })

      }
    });
  }
  title = 'junkPickup';
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

}

