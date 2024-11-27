import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { RoutePath } from 'src/app/common/setting/RoutePath';
RoutePath
const routes: Routes = [{ path: '', component: ManagerComponent },
{ path: RoutePath.users.users, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
{ path: RoutePath.project.projects, loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
{ path: RoutePath.tasks.tasks, loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
