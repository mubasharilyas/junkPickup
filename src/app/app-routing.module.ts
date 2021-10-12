import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TrashUploadComponent } from './components/trash-upload/trash-upload.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './components/category/category.component';

import { AuthGuardGuard } from '../../src/app/guards/auth-guard.guard';
import { UserGuardGuard } from '../../src/app/guards/user-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },


  {path:'category',component:CategoryComponent},
  { path: 'trash-upload', component: TrashUploadComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
