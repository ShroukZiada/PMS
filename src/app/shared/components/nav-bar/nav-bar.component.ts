import { Component, OnInit } from '@angular/core';
import { Helper } from '../../models/helper';
import { UsersService } from 'src/app/Features/manager/users/services/users.service';
import { Users } from 'src/app/Features/manager/users/models/users';
import { AuthService } from 'src/app/Features/auth/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userData: any;
  constructor(private _UsersService: UsersService, private dialog: MatDialog) {
    this.onCurrentUser()
  }
  ngOnInit(): void { }
  emptyImg: string = '../../../../assets/images/dummy-profile (1).png';
  imgUrl: string = 'https:upskilling-egypt.com:3003/';
  currentUser: any;


  openLogoutDialog() {


  }
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
}
