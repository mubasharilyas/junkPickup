import { Component, OnInit } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  collection: any;
  p: number = 1;


  paginationDat: any = { page: 1 }

  details: any = [
    { userName: 'test', }


  ];
  currrentUser: any = { isAdmin: false };
  constructor(public api: ApiService,
    private _loginService: LoginServiceService,
    public router: Router) {
    this._loginService.userSub.subscribe((data: any) => {
      this.currrentUser = data;
    })
  }

  status = ['In progres', 'Completed', 'Contacted the user', 'Need to contact customer', 'Approved']
  onPageChange(event: any) {
    this.p = event
    this.api.updatePaginationSub({ page: event })
  }
  saveData(item: any) {
    console.log(item)
  }
  public viewDetails(orderId: any) {
    this.router.navigate(['/order-items', orderId]);
  }






  ngOnInit(): void {
    this.currrentUser = this._loginService.getUserStatus()
    this.api.paginationSub.subscribe((data: any) => {
      console.log(data)
      this.paginationDat = data;
      this.getAllData();
    })
  }

  getAllData() {
    let url = this.currrentUser && !this.currrentUser.isAdmin ? 'http://localhost:8081/api/v1/getJunksByAdmin' : 'http://localhost:8081/api/v1/getJunksByUser?userId=' + this.currrentUser.id
    this.api.postData(url, this.paginationDat).subscribe(data => {
      this.details = data;
      console.log(this.details)
    }
    )


  }
  updateJunk(junk: any) {

    this.api.putData('http://localhost:8081/api/v1/updateJunk', { status: junk.status, id: junk.id, userId: junk.userId }).subscribe(data => {
      this.getAllData()
      console.log(this.details)
    }
    )

  }
  public toLocalDate(date: string) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
  }
}


