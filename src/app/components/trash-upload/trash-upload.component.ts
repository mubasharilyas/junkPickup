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

  errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(public api: ApiService) {

  }
  ngAfterViewInit(): void {
    console.log(this.input.nativeElement);
    let button = document.getElementById('upload');
    console.log(button)
   
  }
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });

    // this.uploadImage()
  }
  uploadImage() {
    let button = document.getElementById('#upload');
    console.log(button)
    // var images = $('.images')

    // button.on('click', function () {
    //   uploader.click()
    // })

    // uploader.on('change', function () {
    //   var reader = new FileReader()
    //   reader.onload = function (event) {
    //     images.prepend('<div class="img" style="background-image: url(\'' + event.target.result + '\');" rel="' + event.target.result + '"><span>remove</span></div>')
    //   }
    //   reader.readAsDataURL(uploader[0].files[0])

    // })

    // images.on('click', '.img', function () {
    //   $(this).remove()
    // })

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
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);

      me.ImageBaseData = reader.result;
      me.upload.image = me.ImageBaseData
      console.log(me.ImageBaseData)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  goBack() {
    this.showWebcam = false;
  }
  btnUpload() {
    this.api.postData('http://localhost:8081/upload', this.upload)
  }
  handleImage(webcamImage: any) {
    console.log(webcamImage._imageAsDataUrl)
    this.upload.image = webcamImage._imageAsDataUrl
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  upload = {
    image: "", categry: "", numberOfItem: ""
  }



}



