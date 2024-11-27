import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { Projects } from '../models/projects';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _HttpClient: HttpClient) { }

  getManagerProject(Data: any): Observable<Projects.IProjectData> {
    return this._HttpClient.get<Projects.IProjectData>(HttpEndPoint.Projets.ManagerProject, { params: Data })
  }
  AddManagerProject(projectData: FormGroup): Observable<Projects.IAddEditproject> {
    return this._HttpClient.post<Projects.IAddEditproject>(HttpEndPoint.Projets.Project, projectData)
  }
  editManagerProject(id: number, projectData: FormGroup): Observable<Projects.IAddEditproject> {
    return this._HttpClient.put<Projects.IAddEditproject>(HttpEndPoint.Projets.Project + `/${id}`, projectData)
  }
  getManagerProjectById(id: number): Observable<Projects.IProjectsByID> {
    return this._HttpClient.get<Projects.IProjectsByID>(HttpEndPoint.Projets.Project + `/${id}`)
  }
  deleteManagerProjectById(id: number): Observable<Projects.IProjectsByID> {
    return this._HttpClient.delete<Projects.IProjectsByID>(HttpEndPoint.Projets.Project + `/${id}`)
  }
}
