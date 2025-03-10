import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../models/tasks';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { FormGroup } from '@angular/forms';
import { UserTask } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _HttpClient: HttpClient) { }

  getTasksForManager(Data: any): Observable<Tasks.ITasksData> {
    return this._HttpClient.get<Tasks.ITasksData>(HttpEndPoint.Tasks.ManagerTasks, { params: Data });
  }
  getAllUsers(): Observable<any> {
    return this._HttpClient.get(HttpEndPoint.Users.Users, { params: { pageSize: 1000, pageNumber: 1 } })
  }
  getAllProjects(): Observable<any> {
    return this._HttpClient.get(HttpEndPoint.Projets.Project, { params: { pageSize: 1000, pageNumber: 1 } })
  }
  AddTask(taskData: object): Observable<any> {
    return this._HttpClient.post(HttpEndPoint.Tasks.Tasks, taskData)
  }
  updateTask(id: number, taskData: object): Observable<any> {
    return this._HttpClient.put(HttpEndPoint.Tasks.Tasks + `/${id}`, taskData);
  }
  getTasksById(id: number): Observable<any> {
    return this._HttpClient.get(HttpEndPoint.Tasks.Tasks + `/${id}`);
  }
  deleteManagertaskById(id: number): Observable<Tasks.TasksByID> {
    return this._HttpClient.delete<Tasks.TasksByID>(HttpEndPoint.Tasks.Tasks + `/${id}`)
  }
}

