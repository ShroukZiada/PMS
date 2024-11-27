import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(SideBarComponent) sideBar: SideBarComponent | undefined

  takechanging: boolean = true;

  handleChanging(value: boolean) {
    this.takechanging = value;
  }
}
