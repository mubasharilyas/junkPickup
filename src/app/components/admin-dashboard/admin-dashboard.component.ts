import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

 public details=[
    {customer:'Mubashar ilyas',
    email:'emaill',
    address:'burewala',
    picture:'abc',
    catagory:'lk',
    status:'asdsd',
    price:'350'}
    
  ]
  status=['inprogress','Completed','contacted the user','need to contact customer price', 'approved']

  saveData(item:any){
    console.log(item)
  }
  
  




  ngOnInit(): void {
  }
}

