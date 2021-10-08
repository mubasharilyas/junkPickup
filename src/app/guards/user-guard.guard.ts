import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private _loginService: LoginServiceService, private _router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this._loginService.getUserStatus()
    if (this._loginService.getAuthStatus() && !user.isAdmin) {
      return true;
    }
    else if (this._loginService.getAuthStatus()) {
      this._router.navigate(['/admin-dashboard'])
      return false;

    } else {
      this._router.navigate(['/login'])
      return false;
    }
  }

}
