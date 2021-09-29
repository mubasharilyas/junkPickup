import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  handleImage(webcamImage: any) {
  }


  constructor(public api: ApiService, public http: HttpClient) {

  }
  title = 'junkPickup';
  ngOnInit() {
   
  }

}

