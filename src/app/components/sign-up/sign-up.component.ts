import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm=new FormGroup({
    yourName: new FormControl(''),
    email:new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  data = {
    customerName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  }
  isPasswordMatch = true


  public onSubmit() {

    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('email required')
    }
    console.log('userForm', this.userForm.value)
    {
      if ((this.data.password == this.data.confirmPassword)) {
        this.isPasswordMatch = true;
        // this.api.postData('http://localhost:8081/api/v1/signUp', this.data)
      }
      else {
        this.isPasswordMatch = false;

      }
    }
  }
  passwordType = "password"
  passwordClass = "fa fa-eye field-icon toggle-password"

  public onShow() {

    this.passwordType = this.passwordType == "text" ? "password" : "text"
    this.passwordClass = this.passwordClass == "fa fa-eye-slash field-icon toggle-password" ? "fa fa-eye field-icon toggle-password" : "fa fa-eye-slash field-icon toggle-password"

  }


}
