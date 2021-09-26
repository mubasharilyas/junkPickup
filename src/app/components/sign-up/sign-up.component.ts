import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data = {
    customerName: '',
    email: '',
    contactNumber:'',
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
