import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrashUploadComponent } from './trash-upload/trash-upload.component';
import { WebcamModule } from 'ngx-webcam';


import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TrashUploadComponent,

    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
