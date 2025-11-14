import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-proposalname-dialog',
  templateUrl: './proposalname-dialog.component.html',
  styleUrls: ['./proposalname-dialog.component.scss']
})
export class ProposalnameDialogComponent {
addNameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProposalnameDialogComponent>
  ) {
    this.addNameForm = this.fb.group({
      firstName: ['', Validators.required],
      middleInitial: [''],
      lastName: ['', Validators.required],
      suffix: ['']
    });
  }

  submit() {
    if (this.addNameForm.valid) {
      this.dialogRef.close(this.addNameForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
