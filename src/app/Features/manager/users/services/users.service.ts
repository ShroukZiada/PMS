import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { Auth } from 'src/app/Features/auth/models/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  ICurrentUser(): Observable<Users.IUsers> {
    return this._HttpClient.get<Users.IUsers>(HttpEndPoint.Auth.currentUser)
  }
  IUser(): Observable<Users.userData> {
    return this._HttpClient.get<Users.userData>(HttpEndPoint.Users.Users)
  }
}
