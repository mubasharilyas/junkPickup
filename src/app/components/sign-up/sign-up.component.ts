import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  data = {
    userName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  }
  isPasswordMatch = true


  public onSubmit() {
    console.log('data', this.data)
    {
      if ((this.data.password == this.data.confirmPassword)) {
        this.isPasswordMatch = true;
        this.api.postData('http://localhost:8081/api/v1/signUp', this.data)
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
