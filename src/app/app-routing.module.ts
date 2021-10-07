import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TrashUploadComponent } from './components/trash-upload/trash-upload.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  {path :'trash-upload', component: TrashUploadComponent},
  {path:'admin-dashboard', canActivate:[AuthGuard],component:AdminDashboardComponent},
  {path:'category',component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
