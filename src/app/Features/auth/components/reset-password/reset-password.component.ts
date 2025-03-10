import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  statusCode: number | null = null;
  hide: boolean = true;
  hideConfirm: boolean = true;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/),]),
    confirmPassword: new FormControl('', [RxwebValidators.compare({ fieldName: 'password' }), Validators.required]),
    seed: new FormControl('', [Validators.required]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router, private _HelperService: HelperService) { }

  ngOnInit(): void { }

  sendResetForm(): void {
    const data = this.resetForm.value;
    if (this.resetForm.valid) {
      this._AuthService.resetPassword(data).subscribe({
        next: (res) => {
          this._HelperService.success('Password reset successful');
        },
        error: (error: HttpErrorResponse) => this._HelperService.error(error, 'Notify That!'),

        complete: () => {
          this._Router.navigate(['auth/login']);
        }
      });
    }
  }
}
