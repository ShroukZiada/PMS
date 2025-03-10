import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Employee } from '../../model/employee';
import { EployeeService } from '../../service/employee.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  // standalone: true,


})
export class TaskBoardComponent implements OnInit {
  // viewTaskDetails(_t22: Employee.iTask) {
  // }
  mainTextHeader: string = 'Tasks';
  employeeTasksData: Employee.iTask[] = [];
  todo: Employee.iTask[] = [];
  inProgress: Employee.iTask[] = [];
  done: Employee.iTask[] = [];
  constructor(private _employeeService: EployeeService,
    private _HelperService: HelperService,
    private _Router: Router) { }
  ngOnInit(): void {
    this.getAllEmployeeTask();
  }


  getAllEmployeeTask() {
    this._employeeService.getAllEmployeeTasks().subscribe({
      next: (res) => {
        // console.log(res);
        this.employeeTasksData = res.data;
        this.todo = this.employeeTasksData.filter(
          (tasks) => tasks.status == 'ToDo'
        );
        this.inProgress = this.employeeTasksData.filter(
          (tasks) => tasks.status == 'InProgress'
        );
        this.done = this.employeeTasksData.filter(
          (tasks) => tasks.status == 'Done'
        );
      }

    })
  }

  drop(event: CdkDragDrop<Employee.iTask[]>) {

    const item = event.previousContainer.data[event.previousIndex];

    let newStatus: string;

    if (event.container.id === 'cdk-drop-list-0') {
      newStatus = 'ToDo';
    } else if (event.container.id === 'cdk-drop-list-1') {
      newStatus = 'InProgress';
    } else if (event.container.id === 'cdk-drop-list-2') {
      newStatus = 'Done';
    } else {
      newStatus = item.status;
    }
    // console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this._employeeService.employeeTaskStatusChange(item.id, newStatus).subscribe({
        next: (res) => {
          item.status = newStatus;
        },
        error: (error: HttpErrorResponse) => this._HelperService.error(error, 'Notify That!'),
        complete: () => {
          this._HelperService.success('Status updated successfully!')
        },
      })
    }
  } viewTaskDetails(item: Employee.iTask): void {
    // console.log(item)

    this._Router.navigate(['/dashboard/viewTask', item.id, 'isEmployee', 'disabled'])

  }

}