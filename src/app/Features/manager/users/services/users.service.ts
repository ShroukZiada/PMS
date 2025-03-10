import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { Auth } from 'src/app/Features/auth/models/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userName = new BehaviorSubject('');
  userImg = new BehaviorSubject('');
  userEmail = new BehaviorSubject('');


  constructor(private _HttpClient: HttpClient) { }

  ICurrentUser(): Observable<Users.IUsers> {
    return this._HttpClient.get<Users.IUsers>(HttpEndPoint.Auth.currentUser)
  }


  IUser(params: any): Observable<Users.userData> {
    return this._HttpClient.get<Users.userData>(HttpEndPoint.Users.Users, { params: params })
  }

  userStatus(userID: number): Observable<Users.userData> {
    return this._HttpClient.get<Users.userData>(HttpEndPoint.Users.Users + `/${userID}`)
  }

  //  Block & Non-Block
  activateUser(userID: number): Observable<Users.userData> {
    return this._HttpClient.put<Users.userData>(HttpEndPoint.Users.Users + `/${userID}`, {});
  }

  // Get User By Id
  onGetUserById(userID: number): Observable<any> {
    return this._HttpClient.get(HttpEndPoint.Users.Users + `/${userID}`);
  }
  // Get User By Id
  updateProfile(userData: FormData): Observable<Users.IUsers> {
    return this._HttpClient.put<Users.IUsers>(HttpEndPoint.Users.Users, userData);
  }
}


