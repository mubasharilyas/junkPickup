import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [
  ];


  constructor(private api: ApiService, private toaster: ToastrService, private spinner: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this.spinner.start();
    this.api.getData('http://localhost:8081/api/v1/getAllCategories').subscribe((response: any) => {
      this.categories = response
      this.spinner.stop();
    })
  }
  addNew() {
    this.categories.push({ name: '', price: '' });
    console.log(this.categories);
  }
  save(category: any) {
    this.spinner.start();

    this.api.postData('http://localhost:8081/api/v1/createCategory', category).subscribe(response => {
      this.spinner.stop();
      if (response.message) {
        this.toaster.success(response.message)
      } else if (response.error) {
        this.toaster.error(response.error)

      }
      this.getCategories()


    })
  }
  onRemove(item: any, index: any) {
    if (item.id) {
      this.spinner.start();

      this.api.deleteRequest('http://localhost:8081/api/v1/deleteCategory?id=' + item.id).subscribe(response => {
        this.spinner.stop();
        if (response.message) {
          this.toaster.success(response.message)
        } else if (response.error) {
          this.toaster.error(response.error)

        } this.getCategories()

      })
    } else {
      this.categories.splice(index, 1);
    }
  }

}
