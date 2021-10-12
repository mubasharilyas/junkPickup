import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  collection: any;
  p: number = 1;




  details: any = [
    { userName: 'test', }


  ];
  currrentUser: any = { isAdmin: false };
  constructor(public api: ApiService, private _loginService: LoginServiceService) {
    this._loginService.userSub.subscribe((data: any) => {
      this.currrentUser = data;
    })
  }

  status = ['In Progress', 'Completed', 'Contacted the user', 'Need to contact customer', 'Approved']
  onPageChange(event: any) {
    this.p = event
  }
  saveData(item: any) {
    console.log(item)
  }






  ngOnInit(): void {
    this.currrentUser = this._loginService.getUserStatus()
    this.getAllData();
  }

  getAllData() {

    console.log(this.currrentUser)
    let url = this.currrentUser && this.currrentUser.isAdmin ? 'http://localhost:8081/api/v1/getJunksByAdmin' : 'http://localhost:8081/api/v1/getJunksByUser?userId=' + this.currrentUser.id
    this.api.getData(url).subscribe(data => {
      this.details = data;
      console.log(this.details)
    }
    )

  }
  updateJunk(junk: any) {

    this.api.putData('http://localhost:8081/api/v1/updateJunk', { price: junk.price, status: junk.status, id: junk.junkId, userId: junk.userId }).subscribe(data => {
      this.getAllData()
      console.log(this.details)
    }
    )

  }
}


