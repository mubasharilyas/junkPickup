import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  usersData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',)
  });
  submitted = false;

  constructor(public apiService: ApiService
  ) { }

  ngOnInit(): void {


  }




  submit(data: any) {
    this.submitted = true;
    this.apiService.postData('http://localhost:8081/api/v1/login', this.usersData.value).subscribe(data => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
    })
    if (this.usersData.invalid) {
      console.log('email required');
    }
    else{
      console.log('email valid');
    }
    console.log(this.usersData.value);

  }














}




