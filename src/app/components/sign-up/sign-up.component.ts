import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm=new FormGroup({
    yourName: new FormControl('',[Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('',[Validators.required]),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('',[Validators.required]),
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
      console.log('')
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
  passwordClass = "fas fa-eye"

  public onShow() {

    this.passwordType = this.passwordType == "text" ? "password" : "text"
    this.passwordClass = this.passwordClass == "fa fa-eye-slash" ? "fas fa-eye" : "fa fa-eye-slash"

  }


}
