import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from "../../../shared/shared.module";
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    AddEditProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
