import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEndPoint } from 'src/app/common/setting/HttpEndPoint';
import { FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/common/services/token.service';
import { Auth } from '../models/auth';
import { Users } from '../../manager/users/models/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string | null | undefined;




  constructor(private _HttpClient: HttpClient, private _TokenService: TokenService) {
    if (localStorage.getItem('token') !== null) {
      this._TokenService.getProfile()
    }
  }

  IRegister(registerData: FormData): Observable<Auth.IRegisterRes> {
    return this._HttpClient.post<Auth.IRegisterRes>(HttpEndPoint.Auth.register, registerData)
  }


  ILogin(loginData: FormData): Observable<Auth.ILoginRes> {
    return this._HttpClient.post<Auth.ILoginRes>(HttpEndPoint.Auth.login, loginData)
  }


  IVerify(verifyAcc: FormData): Observable<Auth.IVerify> {
    return this._HttpClient.put<Auth.IVerify>(HttpEndPoint.Auth.verifyAcc, verifyAcc)
  }


  IForgePassword(emaiValue: string): Observable<Auth.IForget> {
    return this._HttpClient.post<Auth.IForget>(HttpEndPoint.Auth.forgetPass, emaiValue)
  }

  getRole() {
    if (localStorage.getItem('tokenOfUserr') !== null && localStorage.getItem('userRole') !== null) {
      this.role = localStorage.getItem('userRole')
      console.log(this.role);
    }
  }

  onChangePassword(data: Auth.iChangePassword): Observable<any> {
    return this._HttpClient.put(HttpEndPoint.Auth.ChangePassword, data)
  }
}

