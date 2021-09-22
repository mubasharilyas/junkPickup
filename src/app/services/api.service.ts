import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  displayVal: any;
  postId:any;
  getData() {
    this.http.get('https://product-api-dev.exchangecollective.com').subscribe((data) => {
      this.displayVal = data;
      console.log(data);
    })
  }
  posData(){
    this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
      this.postId = data.id;
    })  }

}  


