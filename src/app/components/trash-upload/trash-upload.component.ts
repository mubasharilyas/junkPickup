import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trash-upload',
  templateUrl: './trash-upload.component.html',
  styleUrls: ['./trash-upload.component.scss']
})
export class TrashUploadComponent implements OnInit, AfterViewInit {

  chackItem: any = [
    { status: '', category: '', numberOfItems: '', }
  ];
  items: any = [
  ];


  @ViewChild('upload') input: any;


  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = false;
  isCameraExist = true;
  ImageBaseData: any;
  uploader: any;
  uploaded = false
  button: any;
  errors: WebcamInitError[] = [];
  categories: any = [];
  otherCategory: any = { isOther: false, name: '', numberOfItems: '', price: '' };
  public junkFormDat = { image: "", fileName: '', userId: 0 }
  constructor(public api: ApiService, private toastr: ToastrService, private spinner: NgxUiLoaderService) {

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
      me.junkFormDat.fileName = me.uploader.files[0].name
      reader.readAsDataURL(me.uploader.files[0])
      reader.onload = function () {

        me.ImageBaseData = reader.result;
        me.junkFormDat.image = me.ImageBaseData
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };


    })


  }
  categoryToggle(category: any, target: any, index: Number) {
    console.log(category, target.checked)
    if (target.checked) {
      this.items.push(category);
    } else {
      this.items.splice(index, 1)
    }
    console.log(this.items)
  }
  toggleOtherCategory(target: any) {
    if (target.checked) {
      this.otherCategory.isOther = true
    } else {
      this.otherCategory.isOther = false

    }
  }
  ngOnInit(): void {
    this.spinner.start();

    this.api.getData('http://localhost:8081/api/v1/getAllCategories').subscribe((response: any) => {
      this.spinner.stop();

      this.categories = response.map((cat: any) => {
        cat.numberOfItems = '';

        return cat
      })
    })



  }



  btnUpload() {
    this.spinner.start();

    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.junkFormDat.userId = user.id;
    let isOtherExist = this.items.filter((x: any) => x.isOther)
    if (this.otherCategory.isOther && !isOtherExist[0]) {
      this.items.push(this.otherCategory)
    }
    // this.junkFormDat.userId = user.id
    this.api.postData('http://localhost:8081/api/v1/createOrder', { ...this.junkFormDat, items: this.items }).subscribe(data => {
      this.uploaded = data;
      console.log(data)
      if (data.errorMessage) {
        this.toastr.error(data.errorMessage);

      } else if (data.success) {
        this.toastr.success('Order created successfully');

      }
      this.spinner.stop();
    })

  }
  handleImage(webcamImage: any) {
    console.log(webcamImage._imageAsDataUrl)
    this.junkFormDat.image = webcamImage._imageAsDataUrl;
    this.junkFormDat.fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.png';
    console.log('this.junkFormDat.fileName', this.junkFormDat.fileName)
    this.showWebcam = false;
  }






}



