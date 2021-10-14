import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
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
  categories: any = []
  public junkFormDat = { image: "", fileName: '', userId: 0 }
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(public api: ApiService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

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
      this.items.push({ categoryId: category.id, ...category });
    } else {
      this.items.splice(index, 1)
    }
  }
  ngOnInit(): void {

    this.api.getData('http://localhost:8081/api/v1/getAllCategories').subscribe((response: any) => {
      this.categories = response.map((cat: any) => {
        cat.numberOfItems = '';
        return cat
      })

    })
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);


  }



  btnUpload() {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.junkFormDat.userId = user.id
    // this.junkFormDat.userId = user.id
    this.api.postData('http://localhost:8081/api/v1/createOrder', { ...this.junkFormDat, items: this.items }).subscribe(data => {
      this.uploaded = data;
      console.log(data)
      if (data.errorMessage){
        this.toastr.error(data.errorMessage);

      }else if(data.success){
        this.toastr.success('Order created successfully');

      }
        console.log(data)
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



