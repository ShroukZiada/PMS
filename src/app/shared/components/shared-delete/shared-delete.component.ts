import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-delete',
  templateUrl: './shared-delete.component.html',
  styleUrls: ['./shared-delete.component.scss']
})
export class SharedDeleteComponent {
  constructor(public dialogRef: MatDialogRef<SharedDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
