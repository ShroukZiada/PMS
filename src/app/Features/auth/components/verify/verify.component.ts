import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  email: string | undefined;
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _HelperService: HelperService, private _Router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email']
    });
  }

  isloading: boolean = false
  verifyForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required]],
  })

  verifyEmail() {
    this.isloading = true
    this._AuthService.IVerify(this.verifyForm.value).subscribe({

      next: (res) => {
        this.isloading = false;
        console.log(res);
        this.isloading = false;
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error, 'Notify That!'),
      complete: () => {
        this._HelperService.success('Now You Can JOIN Us');
        this._Router.navigate(['/auth/login'])
      }
    })
  }
}
