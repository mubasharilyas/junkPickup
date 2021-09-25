import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  displayVal: any;
  postId: any;
  getData(url: any) {
    this.http.get(url).subscribe((data) => {
      this.displayVal = data;
      console.log(data)
      return data;
    })
  }
  postData() {
    this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
      this.postId = data.id;
    })
  }

}


