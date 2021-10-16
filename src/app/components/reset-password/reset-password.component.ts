import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  usersData = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(public apiService: ApiService, private toastr: ToastrService, private route: ActivatedRoute
    , public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];

    }
    )
  }
  resetPassword() {
    console.log('forgot')
    this.apiService.postData('http://localhost:8081/api/v1/updatePassword', { ...this.usersData.value, token: this.token }).subscribe((response: any) => {
      if (response.errorMessage) {
        this.toastr.error(response.errorMessage)
      } else if (response.message) {
        this.toastr.success(response.message);
        this.router.navigate(['/login'])
      }
    })
  }
}
