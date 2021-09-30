import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm:any = new FormGroup({
    yourName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  submitted = false;

  constructor(public api: ApiService, private router: Router) { }

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

  btnClick() {
    this.router.navigate(['/login']);
  }
   onSubmit() {
  


    console.log('userForm', this.userForm.value)
    {
      if (!this.userForm.invalid && (this.userForm.controls.confirmPassword.value == this.userForm.controls.password.value)) {
        console.log('valid');
      }
      else{
        console.log('invalid');
        // this.api.postData('http://localhost:8081/api/v1/signUp', this.data)
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
