// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// import { User } from '../models/User';
// const apiUrl = "http://localhost:3002"
// @Injectable({ providedIn: 'root' })
// export class AuthenticationService {
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;
//   // public isLOgedin;
//   localStored: any;
//   constructor(private http: HttpClient) {
//     this.localStored = localStorage.getItem('currentUser')
//     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.localStored));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
//   }

//   login(email: any, password: any, Socialuser: any) {
//     return this.http.post<any>(`${apiUrl}/login`, { email, password, Socialuser })
//       .pipe(tap(user => {

//         if (user.success) {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           localStorage.setItem('token', JSON.stringify(user.token));
//           this.currentUserSubject.next(user);
//           //  this.isLOgedin=true
//           return user;
//         } else {
//           return user.message;
//         }

//       }))
//   }

//   logout() {
//     // remove user from local storage and set current user to null
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     // this.currentUserSubject.next(null);
//     //  this.isLOgedin=false
//   }
//   getuser() {
//     return this.currentUser
//   }


// }