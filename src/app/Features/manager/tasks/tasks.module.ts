import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from "../../../shared/shared.module";
import { AddEditTasksComponent } from './components/add-edit-tasks/add-edit-tasks.component';


@NgModule({
  declarations: [
    TasksComponent,
    AddEditTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
