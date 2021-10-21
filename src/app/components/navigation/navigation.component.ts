import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  profile: any;
  isLogedin: any;
  user: any;
  ClassesToApply: string = '';
  activePage: any;
  token: any;
  isLoggedIn: boolean = false;
  constructor(private router: Router,
    private route: ActivatedRoute, private _loginService: LoginServiceService
  ) {
    this._loginService.authSub.subscribe((data) => {
      this.isLoggedIn = data
    })
    this._loginService.userSub.subscribe((data: any) => {
      this.user = data;
      console.log('data', data)
    })
  }

  ngOnInit(): void {
    this.getuser();
    this.checkIsLogedin();
    let routeConfig: any = this.route.snapshot.routeConfig;
    this.activePage = routeConfig && routeConfig.path ? routeConfig.path : ''
  }
  public openMenu() {
    this.ClassesToApply = 'menu-target'
  }
  closeOnNavigation() {
    if (this.ClassesToApply == 'menu-target') {
      this.ClassesToApply = 'close-menu';
    }
  }
  public closeMenue() {
    this.ClassesToApply = 'close-menu'
  }
  getuser() {
    this.user = this._loginService.getUserStatus();

  }
  logout() {
    console.log("logout");
    this._loginService.logoutUser()
    this.router.navigate(['/login'])

    // localStorage.removeItem("user");
    // this.isLoggedIn = true;
    // this.router.navigate(['/login']);

  }

  checkIsLogedin() {
    this.isLoggedIn = this._loginService.getAuthStatus()


    // this.user = localStorage.getItem("user");
    // this.token = this.user ? this.user.token : null;
    // console.log(this.activePage, this.user)
    // if (this.user == null && this.token == null) {
    //   this.isLoggedIn = true;
    // } else {
    //   this.isLoggedIn = false;
    // }
  }
}
