import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
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



  constructor(public api: ApiService, public http: HttpClient) {

  }
  title = 'junkPickup';
  ngOnInit() {

  }

}

