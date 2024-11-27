import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/Features/auth/models/auth';
import { AuthService } from 'src/app/Features/auth/services/auth.service';
import { HelperService } from '../../services/helper.service';
import { error } from '@rxweb/reactive-form-validators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})


export class ChangePasswordComponent implements OnInit {

  hideOldPass: boolean = true;
  hideNewPass: boolean = true;
  hideConfirmPass: boolean = true;
  isloading: any;
  hidePaasword: any;
  localPss: any;
  ChangePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),

  })

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Auth.iChangePassword, private _AuthService: AuthService,
    private _Router: Router, private _ToastrService: ToastrService, private _HelperService: HelperService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { }

  onChangePassword(data: FormGroup) {
    this._AuthService.onChangePassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => {
        this.onNoClick();
        this._HelperService.success('Change Password Successfuly.');
      },
    });
  }
}
