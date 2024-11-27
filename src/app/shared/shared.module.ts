import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddEditHeaderComponent } from './components/add-edit-header/add-edit-header.component';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { MatCardModule } from '@angular/material/card';
import { SharedDeleteComponent } from './components/shared-delete/shared-delete.component';

@NgModule({
  declarations: [
    SharedComponent,
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    ChangePasswordComponent,
    AddEditHeaderComponent,
    SharedHeaderComponent,
    SharedDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RxReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule


  ],
  exports: [
    SharedComponent,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RxReactiveFormsModule,
    NavBarComponent,
    SideBarComponent,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    AddEditHeaderComponent,
    SharedHeaderComponent,
    MatPaginatorModule,
    MatCardModule


  ],
  providers: [
  ]
})
export class SharedModule { }
