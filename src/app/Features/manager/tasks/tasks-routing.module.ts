import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddEditTasksComponent } from './components/add-edit-tasks/add-edit-tasks.component';
import { RoutePath } from 'src/app/common/setting/RoutePath';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: RoutePath.tasks.addtask, component: AddEditTasksComponent },
  { path: RoutePath.tasks.edittask, component: AddEditTasksComponent },
  { path: RoutePath.tasks.viewtask, component: AddEditTasksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
