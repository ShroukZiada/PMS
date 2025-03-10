import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';

const routes: Routes = [
  // { path: '**', component: EmployeeComponent },
  { path: '', component: EmployeeComponent },
  { path: 'task-board', component: TaskBoardComponent, title: 'Task board' },
  { path: 'projects', component: ProjectTableComponent, title: 'Projects' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
