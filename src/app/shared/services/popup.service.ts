import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class Popup {
  dialogRef: MatDialogRef<any>|any;

  setDialogRef(dialogRef: MatDialogRef<any>) {
    this.dialogRef = dialogRef;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}