import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
disply='jjj'
array = [{
  "name": "Abid", city: "Burewala", dateOfBirth: "31.12.1997",
},{
  name: "Abid", city: "Burewala", dateOfBirth: "31.12.1997",
}];
  constructor() { }
 
  ngOnInit(): void {
    

  }
  ngAfterViewInit(): void {
    console.log('after intit')
  }
  stringifiedData: any;
  parsedJson: any;
 


}
