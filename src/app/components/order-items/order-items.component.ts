import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent implements OnInit {
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
  currrentUser: any ={isAdmin:false};
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
    // this.currrentUser= localStorage.getItem('user')
    // this.currrentUser = JSON.parse(this.currrentUser)
    // this.getAllData();
  }
  

getAllData() {
  
  console.log(this.currrentUser)
  // this.api.getData('http://localhost:8081/api/v1/getJunksByUser?userId=' + this.currrentUser.id).subscribe(data => {
  //   this.details = data;
  //   console.log(this.details)
  // }
  // )

}
}

