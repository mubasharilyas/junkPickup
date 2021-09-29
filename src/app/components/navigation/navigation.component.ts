import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  profile: any ;
  isLogedin: any;
  user: any ;
  ClassesToApply: string = '';
  activePage: any;
  token: any;
  NotLogedin = true;
  constructor(
    // private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getuser();
    this.checkIsLogedin();
    // this.activePage = this.route.snapshot.routeConfig;
    // this.activePage = this.activePage.path;
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

    // this.profile = localStorage.getItem("currentUser")
    // this.profile= JSON.parse(this.profile);
  }
  logout() {
    console.log("logout");

    window.location.reload();
  }

  checkIsLogedin() {
    // this.user = localStorage.getItem("currentUser");
    // this.token = localStorage.getItem("token");

    if (this.user == null && this.token == null) {
      this.NotLogedin = true;
    } else {
      this.NotLogedin = false;
    }
  }
}
