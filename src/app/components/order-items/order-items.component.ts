import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent implements OnInit, OnDestroy {
  collection: any;
  p: number = 1;

  id: number | undefined;
  private sub: any;
  search: any;

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
  currrentUser: any = { isAdmin: false };
  constructor(public api: ApiService, private route: ActivatedRoute) {
  }

  status = ['inprogress', 'Completed', 'contacted the user', 'need to contact customer price', 'approved']
  onPageChange(event: any) {
    this.p = event
  }
  saveData(item: any) {
    console.log(item)
  }



  ngOnInit(): void {
    this.api.paginationSub.subscribe((data: any) => {
      console.log(data)
      this.search = data.search;
    })
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['orderId'];
      this.getAllData()
      console.log(this.id)
    }
    )
  }


  getAllData() {

    this.api.postData('http://localhost:8081/api/v1/getOrderItemsById', { orderId: this.id, search: this.search }).subscribe(data => {
      this.details = data.items;
      console.log(this.details)
    }
    )

  }
  ngOnDestroy() { this.sub.unsubscribe(); }
}

