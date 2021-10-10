import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [
  ];


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getData('http://localhost:8081/api/v1/getAllCategories').subscribe((response: any) => {
      this.categories = response

    })
  }
  addNew() {
    this.categories.push({ name: '', price: '' });
    console.log(this.categories);
  }
  save(category: any) {
    this.api.postData('http://localhost:8081/api/v1/createCategory', category).subscribe(response => {

    })
  }
  onRemove(item: any, index: any) {
    this.categories.splice(index, 1);
    console.log(this.categories);
  }

}
