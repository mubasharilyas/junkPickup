import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  headerOptions: any = null

  _isLoggedIn: boolean = false

  authSub = new Subject<any>();
  userSub = new Subject<any>();

  constructor(private _http: HttpClient) {
  }

  loginAuth(userObj: any) {
    if (userObj.authcode) {
      this.headerOptions = new HttpHeaders({
        'x-tfa': userObj.authcode
      });
    } else {
      this.headerOptions = null
    }
    return this._http.post("http://localhost:8081/api/v1/login", { email: userObj.email, password: userObj.password }, { observe: 'response', headers: this.headerOptions });
  }


  updateAuthStatus(value: boolean, user: any) {
    this.userSub.next(user)
    this._isLoggedIn = value
    this.authSub.next(value);
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isLoggedIn', value ? "true" : "false");
  }

  getAuthStatus() {
    this._isLoggedIn = localStorage.getItem('isLoggedIn') == "true" ? true : false;
    return this._isLoggedIn
  }
  getUserStatus() {
    let user: any = localStorage.getItem('user')
    console.log(user)
    return user ? JSON.parse(user) : null
  }
  logoutUser() {
    this._isLoggedIn = false;
    this.authSub.next(this._isLoggedIn);
    this.userSub.next(null);
    localStorage.removeItem('user')
    localStorage.setItem('isLoggedIn', "false")
  }



}

