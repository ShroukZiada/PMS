import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Helper } from '../models/helper';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { Projects } from 'src/app/Features/manager/projects/models/projects';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private loadginSubject: Subject<boolean> = new Subject<boolean>();
  loading$ = this.loadginSubject.asObservable();

  show(): void {
    this.loadginSubject.next(true);
  }

  hide(): void {
    this.loadginSubject.next(true);
  }
  constructor(private _ToastrService: ToastrService, private __HttpClient: HttpClient) { }


  error(error: HttpErrorResponse): void {
    this._ToastrService.error(error.error.message, 'Error')
  }

  success(successMessage: string): void {
    this._ToastrService.success(successMessage, 'Success');
  }

  info(infoMessage: string): void {
    this._ToastrService.info(infoMessage, 'Heads up');
  }
  getTasksCount(): Observable<Helper.TaskCount> {
    return this.__HttpClient.get<Helper.TaskCount>(HttpEndPoint.Tasks.TaskCount)
  }

  getUsersCount(): Observable<Helper.UserssCount> {
    return this.__HttpClient.get<Helper.UserssCount>(HttpEndPoint.Auth.usersCount)
  }


  getManagerProject(Data: any): Observable<Projects.IProjectData> {
    return this.__HttpClient.get<Projects.IProjectData>(HttpEndPoint.Projets.ManagerProject, { params: Data })
  }
}
