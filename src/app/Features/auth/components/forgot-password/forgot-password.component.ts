import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = ''
  isloading: boolean = false
  hide = true;
  hide2 = true;
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _HelperService: HelperService,
    private _Router: Router) {
  }

  forgetPassForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  })
  ForgetPassword(ForgetPasswordForm: FormGroup) {
    this.isloading = false
    this._AuthService.IForgePassword(ForgetPasswordForm.value).subscribe({
      next: (res) =>
        this.isloading = false,
      error: (error: HttpErrorResponse) => this._HelperService.error(error, 'Notify That!'),

      complete: () => {
        this.isloading = false
        this._HelperService.success('Please Check Your E-mail');
        this._Router.navigate(['/auth/reset-pass']);
      }
    })

  }
}
