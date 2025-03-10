import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { employeeGuard } from 'src/app/core/gurds/employee.guard';
import { managerGuard } from 'src/app/core/gurds/manager.guard';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'employee', canActivate: [employeeGuard], loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
    { path: 'manager', canActivate: [managerGuard], loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule) },
    {
      path: 'profile',
      loadComponent: () => import('../../shared/components/profile/profile.component').then(m => m.ProfileComponent)
    },]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
