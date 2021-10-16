import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  usersData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    authcode: new FormControl('')
  });
  submitted = false;
  tfaFlag = false;
  response: any;
  resendTime = 0;
  constructor(public apiService: ApiService, private toastr: ToastrService,
    private _loginService: LoginServiceService, public router: Router
  ) { }

  ngOnInit(): void {


  }


  resendCode() {
    this.apiService.postData('http://localhost:8081/api/v1/resendCode', this.usersData.value).subscribe(data => {
      if (data.infoMessage && !data.status) {
        var me = this;
        this.resendTime = 60;

        setInterval(function () {
          if (me.resendTime > 0) {
            me.resendTime--;
          }
        }, 1000);
      }
    })
  }

  submit(data: any) {
    this.submitted = true;
    this._loginService.loginAuth(this.usersData.value).subscribe((data: any) => {
      console.log(data)
      this.response = data.body;
      var me = this
      if (this.response.infoMessage && !this.response.status) {
        this.resendTime = 60;
        setInterval(function () {
          if (me.resendTime > 0) {
            me.resendTime--;
          }
        }, 1000);
      }
      if (this.response.message) {
        console.log(data.body)
        this._loginService.updateAuthStatus(true, data.body.user);
        this.usersData.reset();
        this.router.navigateByUrl('/admin-dashboard');
      }
      else if (this.response.infoMessage) {
        this.toastr.info(this.response.infoMessage);

        this.tfaFlag = true;
      } else {
        this.toastr.error(this.response.errorMessage);

      }


      setTimeout(() => {
        me.response = null
      }, 3000);

    })

  }

  forgotPassword() {
  console.log('forgot')
    this.apiService.postData('http://localhost:8081/api/v1/resetPasswordEmail', this.usersData.value).subscribe((response: any) => {
      if (response.errorMessage) {
        this.toastr.error(response.errorMessage)
      } else if (response.message) {
        this.toastr.success(response.message)
      }
    })
  }














}




