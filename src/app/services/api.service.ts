import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  paginationSub = new BehaviorSubject({ page: 1 });

  constructor(private http: HttpClient) { }
  displayVal: any;
  postId: any;
  updatePaginationSub(value: any) {
    this.paginationSub.next(value)

  }
  getData(url: any) {
    return this.http.get(url)

  }
  postData(url: any, data: any) {
    return this.http.post<any>(url, data)
  }
  deleteRequest(url: any) {
    return this.http.delete<any>(url)
  }
  putData(url: any, data: any) {
    return this.http.put<any>(url, data)
  }
  sendData(save: any) {
    this.http.post<any>('https://reqres.in/api/posts', save).subscribe(data => {
      this.postId = data.id;
    })
  }
  submit(imageSrc: any) {
    this.http.post('http://localhost/phpapi/imageupload.php', imageSrc)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })

  }
  public updateJunk(postData: any) {
    let endPoints = "/posts/1"
    this.http.put(
      endPoints, postData).subscribe(data => {
        console.log(data);
      });
  }




}
