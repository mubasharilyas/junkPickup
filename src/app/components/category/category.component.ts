import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryName:any=[
    {category:'',price:''}
  ];


  constructor() { }

  ngOnInit(): void {
  }
  addNew(name:any){
    this.categoryName.push({category:'',price:''});
    console.log(this.categoryName);
  }
  onRemove(item:any){
    this.categoryName.splice(item,1);
    console.log(this.categoryName);
  }

}
