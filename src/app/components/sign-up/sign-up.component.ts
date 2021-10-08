import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: any = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [Validators.required]),
    address: new FormControl('',[Validators.required]),
    password: new FormControl(''),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  submitted = false;

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  registerd = false
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
        this.api.postData('http://localhost:8081/api/v1/signUp', this.userForm.value).subscribe(data => {
          if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
            if (data.isAdmin) {
              this.router.navigate(['/admin-dashboard']);
            } else if (data) {
              this.router.navigate(['/trash-upload']);

            }
          }
        })
      }
      else {
        console.log('invalid')
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
