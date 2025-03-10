import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from 'src/app/common/models/user';
import { Users } from './models/users';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PageEvent } from '@angular/material/paginator';
import { BlockUserComponent } from './components/block-user/block-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  textHeader: string = 'Users';
  mainTxTHeaderLink: string = 'View all users';
  userstList?: Users.userData | any;
  listUserStatus: Users.IUsers[] = [];
  message: any = '';
  pageSize: number = 50;
  pageNumber: number = 0;
  constructor(private _UsersService: UsersService,
    private _HelperService: HelperService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber + 1
    }
    this._UsersService.IUser(params).subscribe({
      next: (res) => {
        // console.log(res);
        this.userstList = res;
        this.listUserStatus = this.userstList.data;
      },
      error: (err) => {
        // console.log(err.error.message);
      }
    })
  }

  userstatus(userId: number) {
    this._UsersService.userStatus(userId).subscribe({
      next: (res) => {
        // console.log(res);
        this.message = res
      },
      error: (err) => {
        // console.log(err.error.message);
        this._HelperService.error(err.error.message, 'Notify That!')
      },
      complete: () => {
        this.getAllUsers();
        this._HelperService.success('Proccess is Completed Successfully')
      }
    });
  }


  // Open Block Dialog
  openBlockDialog(item: Users.IUsers, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      data: item,
      width: '50%',
      height: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed',result);
      if (result) {
        this.onActivateuser(result)
        // console.log(result);
      }
    });
  }
  // Block & Non-Block
  onActivateuser(id: number) {
    this._UsersService.activateUser(id).subscribe({
      next: (res) => {
        this.message = res;
        // console.log(this.message);
      },
      error: (err) => {
        // console.log(err.error.message);
        this._HelperService.error(err.error.message, 'Notify That!')
      },
      complete: () => {
        this.getAllUsers();
        this._HelperService.success('Proccess is Completed Successfully')


      }
    })
  }

  // Pagination
  handlePageEvent(e: PageEvent) {
    // console.log(e)
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    // Any change in pageSize | pageNumber ==> Call API Again
    this.getAllUsers();
  }
}
