import { Component, OnInit } from '@angular/core';
import { EployeeService } from '../../service/employee.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Employee } from '../../model/employee';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {


  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  mainTextHeader: string = 'Projects';
  title: string = '';
  pageSize: number = 1;
  pageNumber: number = 20;
  employeeProjectsData: Employee.iEmployeeProjects[] = [];
  listData!: Employee.projectTableData;
  isShowCard: boolean = false;
  constructor(private _EployeeService: EployeeService, private _HelperService: HelperService) { }
  ngOnInit(): void {
    this.getProjectsForEmployee()
  }

  getProjectsForEmployee() {
    let pramData = {
      title: this.title,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber + 1,
    }
    this._EployeeService.employeeProject(pramData).subscribe({
      next: res => {
        this.listData = res
        this.employeeProjectsData = res.data;
        // console.log(this.employeeProjectsData);
        // console.log(this.listData);
      },
      error: (err) => {
        // console.log(err);
      },
    })
  }


  handlePageEvent(e: PageEvent) {
    // console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getProjectsForEmployee();
  }
}
