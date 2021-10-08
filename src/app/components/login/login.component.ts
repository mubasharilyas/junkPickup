import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';


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
  errorMessage: any = null

  constructor(public apiService: ApiService, private _loginService: LoginServiceService, public router: Router
  ) { }

  ngOnInit(): void {


  }




  submit(data: any) {
    this.submitted = true;
    this._loginService.loginAuth(this.usersData.value).subscribe((data: any) => {
      debugger;
      this.errorMessage = null;
      if (data['status'] === 200) {
        console.log(data.body.user)
        this._loginService.updateAuthStatus(true, data.body.user);
        this.router.navigateByUrl('/admin-dashboard');
      }
      if (data['status'] === 206) {
        this.tfaFlag = true;
      }
      
    })
  }
 















}




