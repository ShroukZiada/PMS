import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Router } from '@angular/router';
import { Auth } from '../../models/auth';
import { RoutePath } from 'src/app/common/setting/RoutePath';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hidePaasword: boolean = true;
  hideCOMFPaasword: boolean = true;
  localPss: any;
  isloading: boolean = false

  ngOnInit(): void {
    // this.onSignUp(this.registerForm)

  }
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _HelperService: HelperService,
    private _Router: Router) {
  }

  registerForm: FormGroup = this._FormBuilder.group({
    userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,7}[0-9]$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    country: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^^02\d{11}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]],
    confirmPassword: ['', [RxwebValidators.compare({ fieldName: 'password' }), Validators.required]]
  })

  onSignUp(registerForm: FormGroup) {
    console.log(registerForm);
    let formData = new FormData()
    Object.entries<string>(this.registerForm.value).forEach(([key, value]: any) => {
      formData.append(`${key}`, value)
    });

    if (this.uploadedFile && this.uploadedFile.name) {
      formData.append('profileImage', this.uploadedFile, this.uploadedFile.name);
    }
    if (!this.isloading) {
      this.isloading = true;

      this._AuthService.IRegister(formData).subscribe({

        next: (res: Auth.IRegisterRes) => {
          this.isloading = false;
          console.log(res);
          this.isloading = false;
        },
        error: (error: HttpErrorResponse) => this._HelperService.error(error, 'Notify That!'),
        complete: () => {
          this._HelperService.success('Account created successfully. A verification code has been sent to your email address');
          const email = this.registerForm.value.email;
          this._Router.navigate([`/`, RoutePath.Auth.verifyCode], { queryParams: { email: email } });
        }
      })
    }
  }



  imageUrl: string = '';
  uploadedFile!: any; // Property to store the uploaded file
  imageUploaded: boolean = false;

  //ngx file drop
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    const droppedFile = files[0]; // Access the first dropped file
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // Here you can access the dropped file
        // console.log('Dropped file:', file);
        // Assuming imageUrl is the URL to display the uploaded image
        this.imageUrl = URL.createObjectURL(file);
        this.uploadedFile = file;
        this.imageUploaded = true;
      });
    }
  }

  public fileOver(event: any) {
    // console.log(event);
  }
  public fileLeave(event: any) {
    // console.log(event);
  }

}
