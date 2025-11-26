import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-apr-verificationdate-dialog',
  templateUrl: './apr-verificationdate-dialog.component.html',
  styleUrls: ['./apr-verificationdate-dialog.component.scss']
})
export class AprVerificationdateDialogComponent {
verificationForm: FormGroup;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AprVerificationdateDialogComponent>
  ) {
    const today = new Date();
    this.maxDate = new Date(today);
    this.maxDate.setDate(today.getDate() - 1);

    this.verificationForm = this.fb.group({
      verificationDate: ['', Validators.required]
    });
  }

  save() {
  if (this.verificationForm.invalid) {
    this.verificationForm.markAllAsTouched();  
    return;
  }

  this.dialogRef.close({
    verificationDate: this.verificationForm.value.verificationDate
  });
}


  cancel() {
    this.dialogRef.close();
  }
}
