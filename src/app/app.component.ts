import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  handleImage(webcamImage: any) {
    console.log(webcamImage._imageAsDataUrl)
  }


  constructor(public api: ApiService) {

  }
  title = 'junkPickup';
  ngOnInit() {
    this.api.getData("http://localhost:8081/")

  }

}





