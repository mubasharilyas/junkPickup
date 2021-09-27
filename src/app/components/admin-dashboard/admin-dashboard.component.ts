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

  constructor() {
  }
  public details = [
    {
      customer: 'Mubashar ilyas',
      address: 'burewala',
      picture: 'abc',
      catagory: 'lk',
      status: 'asdsd',
      price: '350'
    }

  ]
  status = ['inprogress', 'Completed', 'contacted the user', 'need to contact customer price', 'approved']
  onPageChange(event: any) {
    this.p = event
  }
  saveData(item: any) {
    console.log(item)
  }






  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {

  }
}


