import { Component, OnInit } from '@angular/core';
import { Helper } from '../../models/helper';
import { UsersService } from 'src/app/Features/manager/users/services/users.service';
import { AuthService } from 'src/app/Features/auth/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { LogOutComponent } from '../log-out/log-out.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userData: any;
  constructor(private _UsersService: UsersService, private dialog: MatDialog,
    private _Router: Router, private _AuthService: AuthService) {
    this.onCurrentUser()
  }
  ngOnInit(): void { }
  emptyImg: string = '../../../../assets/images/dummy-profile (1).png';
  imgUrl: string = 'https:upskilling-egypt.com:3003/';
  currentUser: any;

  onCurrentUser() {
    this._UsersService.ICurrentUser().subscribe({
      next: (res: any) => {
        this.currentUser = res;
        console.log(this.currentUser);
      },
      complete: () => { },
    });
  }



  changePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //   console.log('Received data from dialog:', result); //add a toaster or notifier
      }
    });
  }


  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogOutComponent, {
      data: 'logout',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._AuthService.logout()
        this._Router.navigate(['/auth/login'])
      }
    });
  }
}
