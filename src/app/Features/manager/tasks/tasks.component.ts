import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Tasks } from './models/tasks';
import { TasksService } from './services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SharedDeleteComponent } from 'src/app/shared/components/shared-delete/shared-delete.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  openDeleteDialog(arg0: number, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private _TasksService: TasksService, public dialog: MatDialog, private _HelperService: HelperService) { }
  ngOnInit(): void {
    this.onGetManagerTasks()
  }

  projectFiltrationValue: string = '';
  myControl = new FormControl();
  TasktList: Tasks.Tasks[] = []
  pageNumber: number = 0;
  pageSize: number = 10;
  status: string = '';
  title: string = '';
  totalNumberOfRecords: number | undefined;

  // Function To Get ManagerTasks
  onGetManagerTasks() {
    let prams = {
      title: this.title,
      status: this.status,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber + 1
    }
    this._TasksService.getTasksForManager(prams).subscribe({
      next: (res) => {
        this.TasktList = res.data
        console.log(this.TasktList);

        this.totalNumberOfRecords = res.totalNumberOfRecords
      },
    })
  }
  // Function To oPEN Shared Delet Component
  openDeleteDialo(id: number, taskName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialo = this.dialog.open(SharedDeleteComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { itemID: id, name: taskName, type: 'task' },

    });
    dialo.afterClosed().subscribe(res => {
      if (res != null) {
        this.onDeleteTasks(res)
      }
    })
  }

  // Function To Delete ManagerTasks By ID
  onDeleteTasks(id: number) {
    this._TasksService.deleteManagertaskById(id).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),

      complete: () => {
        this.onGetManagerTasks()
        this._HelperService.success('task deleted Successfully');
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
    this.onGetManagerTasks()
  }

}
