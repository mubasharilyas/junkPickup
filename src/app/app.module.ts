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
import { CameraComponent } from './camera/camera.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { JwtInterceptor } from "./jwt.interceptor";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { CotactUsComponent } from './components/cotact-us/cotact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TrashUploadComponent,

    AdminDashboardComponent,
      CameraComponent,

    NavigationComponent,
      CotactUsComponent,
      AboutUsComponent,
      OrderItemsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxSpinnerModule,


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
