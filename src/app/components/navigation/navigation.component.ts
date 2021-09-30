import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  NotLogedin = true;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getuser();
    this.checkIsLogedin();
    let routeConfig: any = this.route.snapshot.routeConfig;
    this.activePage = routeConfig && routeConfig.path ? routeConfig.path : ''
  }
  public openMenu() {
    this.ClassesToApply = 'menu-target'
  }

  public closeMenue() {
    this.ClassesToApply = 'close-menu'
  }
  getuser() {
    this.isLogedin = true;

    // this.isLogedin=this.authenticationService.getuser().subscribe(user=>{
    //   console.log(user,'check user')
    // }

    // )

    // this.profile = localStorage.getItem("user")
    // this.profile= JSON.parse(this.profile);
  }
  logout() {
    console.log("logout");
    localStorage.removeItem("user")
    window.location.reload();
  }

  checkIsLogedin() {
    this.user = localStorage.getItem("user");
    this.token = this.user ? this.user.token : null;
    console.log(this.activePage, this.user)
    if (this.user == null && this.token == null) {
      this.NotLogedin = true;
    } else {
      this.NotLogedin = false;
    }
  }
}
