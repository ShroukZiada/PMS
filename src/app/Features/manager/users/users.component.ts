import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  textHeader: string = 'Users';
  mainTxTHeaderLink: string = 'View all users';
  userstList: any;

  constructor(private _UsersService: UsersService) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this._UsersService.IUser().subscribe({
      next: (res) => {
        console.log(res);

      }
    })
  }
}
