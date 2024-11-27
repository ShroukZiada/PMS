import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../services/auth.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
// import { ILoginReq } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/common/Enums/RoleEnum..enum';
import { TokenService } from 'src/app/common/services/token.service';
import { Auth } from '../../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  localPss: any;
  hidePaasword: boolean = true;
  isloading: boolean = false
  userName: string = '';
  RoleEnum = RoleEnum;
  role: string = '';
  Usertoken: any = '';
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _HelperService: HelperService, private _Router: Router, private _TokenService: TokenService) { }


  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]],
  })

  onLogin(loginForm: FormGroup) {
    // console.log(loginForm);
    if (!this.isloading && this.loginForm.valid) {
      this.isloading = true;
      this._AuthService.ILogin(loginForm.value).subscribe({
        next: (res: Auth.ILoginRes) => {
          this.isloading = false;
          this._TokenService.setToken(res.token)
          this._TokenService.getProfile()
        },
        error: (error: HttpErrorResponse) => this._HelperService.error(error),
        complete: () => {
          this._HelperService.success('Thanks for joining We’re thrilled to have you.');
          this.isloading = false;
          this._Router.navigate(['/dashboard']);

        }
      });
    }
  }
}
