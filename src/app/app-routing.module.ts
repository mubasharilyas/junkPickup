import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TrashUploadComponent } from './components/trash-upload/trash-upload.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { OrderItemsComponent } from './components/order-items/order-items.component';

import { CategoryComponent } from './components/category/category.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'order-items/:orderId', component: OrderItemsComponent ,canActivate: [AdminGuard]},
  { path: 'category', component: CategoryComponent ,canActivate: [AdminGuard]},
  { path: 'trash-upload', component: TrashUploadComponent, canActivate: [UserGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
