import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    EmployeeComponent,
    ProjectTableComponent,
    TaskBoardComponent

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    DragDropModule
  ],
  exports: [
    SharedModule,
    DragDropModule,
    DragDropModule

  ]
})
export class EmployeeModule { }
