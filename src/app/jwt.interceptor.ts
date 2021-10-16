import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let user: any = localStorage.getItem('user');
        user = JSON.parse(user)
        console.log(user)
        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${user.token}`,
                    token: `${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}