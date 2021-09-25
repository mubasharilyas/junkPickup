import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  constructor( public apiService:ApiService
    ) { }
  usersData={
    Username:'',
    Password:'',

  }

  submit(data:string){
  this.apiService.postData(this.usersData)
    console.log(this.usersData);

  }
  
   
   
    





  

  ngOnInit(): void {

   
    
    
  }


}

