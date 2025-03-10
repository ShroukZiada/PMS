import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
@Injectable({
  providedIn: 'root'
})
export class EployeeService {

  constructor(private _HttpClient: HttpClient) { }


  employeeProject(empProject: any): Observable<Employee.projectTableData> {
    return this._HttpClient.get<Employee.projectTableData>(HttpEndPoint.Projets.employeeProoject)
  }

  getAllEmployeeTasks(): Observable<any> {
    return this._HttpClient.get(HttpEndPoint.Tasks.Tasks, { params: { pageSize: 1000, pageNumber: 1 } })

  }
  employeeTaskStatusChange(id: number, status: string): Observable<any> {
    return this._HttpClient.put(HttpEndPoint.Tasks.Tasks + `/${id}/change-status`, { status: status });
  }

}
