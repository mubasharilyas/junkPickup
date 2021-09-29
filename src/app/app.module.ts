import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrashUploadComponent } from './components/trash-upload/trash-upload.component';
import { WebcamModule } from 'ngx-webcam';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { JwtInterceptor } from "./jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TrashUploadComponent,

    AdminDashboardComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    NgxPaginationModule,
    ReactiveFormsModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
