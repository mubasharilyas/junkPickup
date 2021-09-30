import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  collection: any;
  p: number = 1;
  details: any = [
    {
      userName: 'Mubashar ilyas',
      address: 'burewala',
      picture: 'abc',
      catagory: 'lk',
      status: 'asdsd',
      price: '350'
    }

  ];
  currrentUser: any ;
  constructor(public api: ApiService) {
  }

  status = ['inprogress', 'Completed', 'contacted the user', 'need to contact customer price', 'approved']
  onPageChange(event: any) {
    this.p = event
  }
  saveData(item: any) {
    console.log(item)
  }






  ngOnInit(): void {
    this.currrentUser= localStorage.getItem('user')
    this.currrentUser = JSON.parse(this.currrentUser)
    this.getAllData();
  }

  getAllData() {
  
    console.log(this.currrentUser)
    this.api.getData('http://localhost:8081/api/v1/getJunksByUser?userId=' + this.currrentUser.id).subscribe(data => {
      this.details = data;
      console.log(this.details)
    }
    )

  }
}


