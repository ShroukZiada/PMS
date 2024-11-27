import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RoutePath } from 'src/app/common/setting/RoutePath';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: RoutePath.Auth.Login, pathMatch: 'full' },
  { path: RoutePath.Auth.Login, component: LoginComponent, title: 'Sign in' },
  { path: RoutePath.Auth.Register, component: RegisterComponent, title: 'Sign up' },
  { path: RoutePath.Auth.forgetPass, component: ForgotPasswordComponent, title: 'Forgot Password' },
  { path: RoutePath.Auth.verifyCode, component: VerifyComponent, title: 'verify Code' },
  { path: RoutePath.Auth.ResetPass, component: ResetPasswordComponent, title: 'Reset Password' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
