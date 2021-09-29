import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trash-upload',
  templateUrl: './trash-upload.component.html',
  styleUrls: ['./trash-upload.component.scss']
})
export class TrashUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('upload') input: any;

  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = false;
  isCameraExist = true;
  ImageBaseData: any;
  uploader: any;
  button: any;
  errors: WebcamInitError[] = [];
  upload = {
    image: "", category: 'TV', numberOfItems: 1, fileName: '', userId: 6

  }

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(public api: ApiService) {

  }
  ngAfterViewInit(): void {

    this.button = document.getElementById('upload');
    this.uploader = document.createElement('input');
    this.uploader.setAttribute("type", "file");
    this.uploader.setAttribute("accept", "image/*");

  }
  clickUpload() {
    this.uploader.click()
    let me = this
    this.uploader.addEventListener("change", function () {
      var reader = new FileReader()
      me.upload.fileName = me.uploader.files[0].name
      reader.readAsDataURL(me.uploader.files[0])
      reader.onload = function () {

        me.ImageBaseData = reader.result;
        me.upload.image = me.ImageBaseData
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };


    })


  }
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => { 
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });


  }


  takeSnapshot(): void { 
    this.trigger.next();
    this.showWebcam = false;
  }
  onOffWebCame() {
    this.showWebcam = true;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }
  handleFileInput(event: any) {
    let me = this;
    let file = event.target.files[0];
    console.log("file", file)
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      me.ImageBaseData = reader.result;
      me.upload.image = me.ImageBaseData
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  goBack() {
    this.showWebcam = false;
  }
  btnUpload() {
    let currentUser: any = localStorage.getItem('currentUser')

    // this.upload.userId = currentUser.id
    this.api.postData('http://localhost:8081/api/v1/createJunk', this.upload).subscribe(data => {
      console.log(data)
    })
  }
  handleImage(webcamImage: any) {
    console.log(webcamImage._imageAsDataUrl)
    this.upload.image = webcamImage._imageAsDataUrl;
    this.upload.fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.png';
    console.log('this.upload.fileName', this.upload.fileName)
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }




}



