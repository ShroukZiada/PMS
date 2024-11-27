import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../models/tasks';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _HttpClient: HttpClient) { }

  getTasksForManager(Data: any): Observable<Tasks.ITasksData> {
    return this._HttpClient.get<Tasks.ITasksData>(HttpEndPoint.Tasks.ManagerTasks, { params: Data });
  }


  deleteManagertaskById(id: number): Observable<Tasks.TasksByID> {
    return this._HttpClient.delete<Tasks.TasksByID>(HttpEndPoint.Tasks.Tasks + `/${id}`)
  }
}

