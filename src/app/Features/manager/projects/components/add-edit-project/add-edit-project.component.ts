import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RoutePath } from 'src/app/common/setting/RoutePath';
import { Projects } from '../../models/projects';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  // Main Text Add-Edit header  will be passed to the add-edit--shared-header component ...
  editTextHeader: string = 'Update this project';

  addTextHeader: string = 'Add a new project';
  viewTextHeader: string = 'View a project';


  // Main Text Add-Edit header Link  will be passed to the add-edit--shared-header component ...
  mainTxTHeaderLink: string = 'View all projects';


  ProjectID: number = 0;
  ModePram: string = '';
  EditPram: string = '';
  isNonDisplay: boolean = false;
  projectList: Projects.IProjectsByID = {
    id: 0,
    title: '',
    description: '',
    creationDate: 0,
    modificationDate: 0,
    task: [],
    manager: []
  }

  constructor(private _ProjectsService: ProjectsService, private _ActivatedRoute: ActivatedRoute, private _FormBuilder: FormBuilder,
    private _Router: Router, private _HelperService: HelperService) {

  }
  ngOnInit(): void {
    this.ProjectID = this._ActivatedRoute.snapshot.params['id'];
    this.ModePram = this._ActivatedRoute.snapshot.params['mode'];
    this.EditPram = this._ActivatedRoute.snapshot.params['edit'];
    if (this.ProjectID) {
      this.getProjectByID(this.ProjectID)
    }

    // If the condition to catch MoodPram from the URL To Make addEditProjectForm 
    // Disable In Case #View ..
    if (this.ModePram == 'disabled') {
      this.addEditProjectForm.disable();
      this.isNonDisplay = false;
      this.editTextHeader = 'View this Project'
    } else {
      this.addEditProjectForm.enable();
      this.isNonDisplay = true;
    }
  }

  // Initialize form group with title and description control

  addEditProjectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  //Function To Add-And-Edit-Project Function 
  onAddEdietProject(ProjectForm: FormGroup) {
    console.log(ProjectForm.value);
    if (this.ProjectID) {
      this._ProjectsService.editManagerProject(this.ProjectID, ProjectForm.value).subscribe({
        next: () => { },
        error: (error: HttpErrorResponse) => this._HelperService.error(error),
        complete: () => {
          this._Router.navigate([RoutePath.project.project])
          this._HelperService.success('Project Updated Successfully');
        }
      })
    } else {
      this._ProjectsService.AddManagerProject(ProjectForm.value).subscribe({
        next: () => { },
        error: (error: HttpErrorResponse) => this._HelperService.error(error),
        complete: () => {
          this._Router.navigate([RoutePath.project.project])
          this._HelperService.success('Project Created Successfully');
        }
      })
    }
  }

  //Function To Get-Project-By-ID Function 
  getProjectByID(id: number) {
    this._ProjectsService.getManagerProjectById(id).subscribe({
      next: (res) => {
        this.projectList = res
        console.log(this.projectList);
      },
      error(err) { },
      complete: () => {
        this.addEditProjectForm.patchValue({
          title: this.projectList.title,
          description: this.projectList.description
        });
      },
    });
  }






}
