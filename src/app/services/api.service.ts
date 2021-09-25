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
  postData(receive:any){
    this.http.post<any>('https://reqres.in/api/posts',receive ).subscribe(data => {
      this.postId = data.id;
    }) 
   }
   sendData(save:any){
    this.http.post<any>('https://reqres.in/api/posts',save ).subscribe(data => {
      this.postId = data.id;
    }) 
   }
   submit(imageSrc:any){
    this.http.post('http://localhost/phpapi/imageupload.php',imageSrc)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })

  

}  

}
