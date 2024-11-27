import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/common/Enums/RoleEnum..enum';
import { AuthService } from 'src/app/Features/auth/services/auth.service';
import { Helper } from '../../models/helper';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Output() isOpenedValue = new EventEmitter<boolean>();
  isOpened: boolean = true;

  constructor(private _AuthService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  isManager(): boolean {
    return localStorage.getItem('userRole') == "Manager" ? true : false;
  }

  isEmployee(): boolean {
    return localStorage.getItem('userRole') == "Employee" ? true : false;
  }
  menu: Helper.IMenu[] = [
    {
      text: 'Home',
      icon: 'fa-solid fa-house',
      link: '/dashboard/home',
      isActive: this.isManager() || this.isEmployee()
    },
    {
      text: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/manager/users',
      isActive: this.isManager(),
    },
    {
      text: 'Projects',
      icon: 'fa-solid fa-table-cells-large',
      link: '/dashboard/manager/projects',
      isActive: this.isManager(),
    },
    {
      text: 'Tasks',
      icon: 'fa-solid fa-list-check',
      link: '/dashboard/manager/tasks',
      isActive: this.isManager(),
    },
    {
      text: 'Projects',
      icon: 'fa-solid fa-table-cells-large',
      link: 'employee/projects',
      isActive: this.isEmployee(),
    },
    {
      text: 'Tasks',
      icon: 'fa-solid fa-list-check',
      link: '/dashboard/employee/task-board',
      isActive: this.isEmployee(),
    },
  ]

  onClicked() {
    this.isOpened = !this.isOpened;
    this.isOpenedValue.emit(this.isOpened);
    console.log(this.isOpened)
  }

}
