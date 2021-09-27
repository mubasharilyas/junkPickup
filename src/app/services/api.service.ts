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
  postData(url: any, data: any) {
    this.http.post<any>(url, data).subscribe(data => {
      console.log(data)
    })
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
