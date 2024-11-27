import { Injectable } from '@angular/core';
import { RoleEnum } from '../Enums/RoleEnum..enum';
import { Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roleUser: string = '';
  constructor(private _router: Router) { }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || "";
  }
  getProfile() {
    let encoded = this.getToken();
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('userName', decoded.userName)
    localStorage.setItem('userRole', decoded.userGroup)
    console.log(decoded);
    this.getRole()
  }


  getRole() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('userRole') !== null) {
      this.roleUser = JSON.stringify(localStorage.getItem('userRole'));
    }
  }


}