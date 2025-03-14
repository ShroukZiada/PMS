import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UserTask } from '../../../tasks/models/user';
import { BlockUserComponent } from '../block-user/block-user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [DatePipe]

})
export class ViewUserComponent {
  userId: number | any;
  user: Users.IUsers | any;
  pathHttps: string = 'https://upskilling-egypt.com:3003/';
  Message: string = '';
  formattedCreationDate: string | null | undefined;
  constructor(
    private _HelperService: HelperService,
    private _ActivatedRoute: ActivatedRoute,
    private _UsersService: UsersService,

    private dialog: MatDialog,
    private datePipe: DatePipe

  ) {
    this.userId = _ActivatedRoute.snapshot.params['id']
    // console.log(this.userId);

    this.getUserById(this.userId);
  }

  getUserById(id: number) {
    this._UsersService.onGetUserById(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.user = res;
        this.formattedCreationDate = this.datePipe.transform(this.user.creationDate, 'dd/MM/yyyy hh:mm a');
      },
      error: (err) => {
        // console.log(err.error.message);
      },
      complete: () => {
      }
    })
  }

  openBlockDialog(item: UserTask.Users): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      data: item,
      width: '35%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed',result);
      if (result) {
        this.activateUser(result)
      }
    });
  }

  activateUser(id: number) {
    this._UsersService.activateUser(id).subscribe({
      next: (res) => {
        this.Message = res.message;
      }, error: (err) => {
        this._HelperService.error(err.error.message, 'error')
      }, complete: () => {
        this.getUserById(this.userId);
        this._HelperService.success('Proccess is Completed Successfully')
      }
    })

  }
}
