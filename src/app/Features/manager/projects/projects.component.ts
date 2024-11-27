import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { Projects } from './models/projects';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SharedDeleteComponent } from 'src/app/shared/components/shared-delete/shared-delete.component';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectFiltrationValue: string = '';
  myControl = new FormControl();
  filteredProject: any[] = [];
  projects: any[] = [];
  projectTitle: string = '';
  pageNumber: number = 0;
  pageSize: number = 10;
  status: any;
  projectList: Projects.IProjectData = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  }

  constructor(private _ProjectsService: ProjectsService, public dialog: MatDialog, private _HelperService: HelperService) { }
  ngOnInit(): void {
    // Handel Search Input ...
    this.filteredProject = this.projects;
    this.myControl.valueChanges
      .pipe(startWith(''), map((value) => this._filter(value))
      )
      .subscribe((filteredProjects) => {
        this.filteredProject = filteredProjects;
      });
    this.onGetManagerProjects()

  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.projectList.data.filter((project) =>
      project.title.toLowerCase().includes(filterValue)
    );
  }


  onGetManagerProjects() {
    let params: Projects.IProjectParams = {
      title: this.projectFiltrationValue,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber + 1,
    }
    this._ProjectsService.getManagerProject(params).subscribe({
      next: (res) => {
        this.projectList = res
        console.log(res);
      },
      error(err) { },
      complete() { },
    })
  }


  openDeleteDialog(id: number, projectName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log(id);
    const dialogRef = this.dialog.open(SharedDeleteComponent, {
      data: { itemID: id, name: projectName, type: 'project' },
      width: '50%',
      height: '50%',
      enterAnimationDuration,
      exitAnimationDuration,

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteProject(id);
      }
    });
  }
  onDeleteProject(id: number) {
    this._ProjectsService.deleteManagerProjectById(id).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),

      complete: () => {
        this.onGetManagerProjects()
        this._HelperService.success('Project deleted Successfully');
      }
    })
  }

  // Handle Paginator ...
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.onGetManagerProjects()
  }
}






