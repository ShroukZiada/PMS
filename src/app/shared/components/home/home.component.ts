import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/Features/manager/projects/models/projects';
import { ProjectsService } from 'src/app/Features/manager/projects/services/projects.service';
import { Tasks } from 'src/app/Features/manager/tasks/models/tasks';
import { TasksService } from 'src/app/Features/manager/tasks/services/tasks.service';
import { HelperService } from '../../services/helper.service';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('userRole');

  projectList: Projects.IProjectData = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  }
  tasksList: Tasks.ITasksData = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  }

  chart: any = [];
  tasksCount: any;
  usersCount: any;
  projectsCount: any;
  tasksNumber: any;
  status: string = '';
  title: string = '';
  pageSize: number = 10;
  pageNumber: number = 1;
  total: number = 0;
  projectTitle: string = '';
  constructor(private _ProjectsService: ProjectsService, private _TasksService: TasksService, private _HelperService: HelperService) { }
  ngOnInit(): void {
    if (this.userRole == 'Manager') {
      this.onGetManagerProjects()
      this.onGetManagerTasks()
      this.onGetTasksCount()
      this.getUsersCount()
    } else {
      this.getTasksCountEmployee()

    }
  }

  // Projects Number
  onGetManagerProjects() {
    let params: Projects.IProjectParams = {
      title: this.title,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }
    this._HelperService.getManagerProject(params).subscribe({
      next: (res) => {
        this.projectList = res;
        this.projectsCount = res.totalNumberOfRecords;
      }
    })
  }

  // Tasks Number
  onGetManagerTasks() {
    let params: Tasks.ITaskParams = {
      title: this.title,
      status: this.status,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }
    this._TasksService.getTasksForManager(params).subscribe({
      next: (res) => {
        this.tasksList = res
        this.tasksNumber = res.totalNumberOfRecords;
      },
    })
  }

  // Tasks Status (Manager)
  onGetTasksCount() {
    this._HelperService.getTasksCount().subscribe({
      next: (res) => {
        // console.log(res);
        this.tasksCount = res
      },
      error: () => { },
      complete: () => {
        this.chart = new Chart('status',
          {
            type: 'doughnut',
            data: {
              labels: [
                'To Do', 'In Progress', 'Done'
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [this.tasksCount?.toDo, this.tasksCount?.inProgress, this.tasksCount?.done],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 128, 0)',
                  'rgb(0,128,0)',
                ],
                hoverOffset: 4
              }]
            }
          })
      },
    })
  }

  // Tasks Status (Employee)
  getTasksCountEmployee() {
    this._HelperService.getTasksCount().subscribe({
      next: (res) => {
        // console.log(res);
        this.tasksCount = res;
        // console.log(this.tasksCount);


      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        this.chart = new Chart('employeeStat', {
          type: 'doughnut',
          data: {
            labels: [
              'To Do', 'In Progress', 'Done'],
            datasets: [{
              label: 'Status',
              data: [this.tasksCount?.toDo, this.tasksCount?.inProgress, this.tasksCount?.done],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 128, 0)',
                'rgb(0,128,0)',
              ], hoverOffset: 4
            }]
          }
        })
      }
    })
  }

  // User Count (Active & Not-Active)
  getUsersCount() {
    this._HelperService.getUsersCount().subscribe({
      next: (res) => {
        this.usersCount = res
        // console.log(this.usersCount);

      },
      error: () => { },
      complete: () => { },

    })
  }
}