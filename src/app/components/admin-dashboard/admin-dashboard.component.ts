import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  collection: any;
  p: number = 1;
  subscription: any;
  totalOrders = 0;
  selectedOrder: any = null;;
  paginationData: any = { page: 1 }
  searchProperty = '';
  searchValue = ''
  details: any = [



  ];
  currrentUser: any = { isAdmin: false };
  constructor(public api: ApiService,
    private _loginService: LoginServiceService,
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService) {
    this._loginService.userSub.subscribe((data: any) => {
      this.currrentUser = data;
    })
  }

  status = ['In Progres', 'Completed', 'Contacted the user', 'Need to contact customer', 'Approved']
  onPageChange(event: any) {
    this.paginationData.page = event
    this.api.updatePaginationSub(this.paginationData)
  }

  public viewDetails(orderId: any) {
    this.router.navigate(['/order-items', orderId]);
  }






  ngOnInit(): void {
    this.currrentUser = this._loginService.getUserStatus()
    this.subscription = this.api.paginationSub.subscribe((data: any) => {
      if (data.search) {
        this.searchProperty = data.search.property
        this.searchValue = data.search.value

      }
      this.paginationData = data;
      this.getAllData();
    })
  }
  updateSearch() {
    this.paginationData.page = 1
    this.paginationData.search = { property: this.searchProperty, value: this.searchValue }
    this.api.updatePaginationSub(this.paginationData)
  }
  clearSearch() {
    this.searchProperty = '';
    this.searchValue = ''

    this.paginationData.search = null;
    this.paginationData.page = 1
    this.api.updatePaginationSub(this.paginationData)
  }
  getAllData() {
    this.spinner.start();

    if (this.currrentUser) {
      let url = 'http://localhost:8081/api/v1/getJunksByAdmin'
      this.api.postData(url, this.paginationData).subscribe(data => {
        this.details = data.orders;
        this.totalOrders = data.totalOrders;
        this.spinner.stop();

        console.log(data)
      }
      )
    }


  }
  viewCustomer(item: any) {
    console.log(item);
    this.selectedOrder = item;
  }
  updateJunk(junk: any) {
    this.spinner.start();

    this.api.putData('http://localhost:8081/api/v1/updateJunk', { status: junk.status, id: junk.id, userId: junk.userId }).subscribe(data => {
      this.spinner.stop();

      if (data && data.success) {
        this.toastr.success(data.success);

      } else {
        this.toastr.error(data.error);


      }

      this.getAllData()
    }
    )

  }
  public toLocalDate(date: string) {
    return new Date(date).toLocaleDateString()
  }
  ngOnDestroy() {
    console.log('Destroyed')
    this.subscription.unsubscribe();
  }
}


