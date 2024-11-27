import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';
import { RoutePath } from 'src/app/common/setting/RoutePath';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: RoutePath.project.addProject, component: AddEditProjectComponent },
  { path: RoutePath.project.editProject, component: AddEditProjectComponent },
  { path: RoutePath.project.viewProject, component: AddEditProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
