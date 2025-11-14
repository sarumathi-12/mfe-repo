import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProposalnameDialogComponent } from '../proposalname-dialog/proposalname-dialog.component';
import { NumericTextBox } from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AprVerificationdateDialogComponent } from '../apr-verificationdate-dialog/apr-verificationdate-dialog.component';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {
  public generalInfoForm: FormGroup;
  public balanceForm!: FormGroup;
  public minDate: Date;
  public showFullAccountNumber = false;
  public proposalNames: string[] = ['Bruce Doe', 'Monica Geller'];


  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    const today = new Date();
    this.minDate = new Date(today);
    this.minDate.setDate(today.getDate() + 1);

    this.generalInfoForm = this.fb.group({
      creditorName: [{ value: 'Citigroup', disabled: true }],
      accountNumber: [''],
      ownerOfDebt: ['', Validators.required],
      proposalName: [''],
      dueDate: ['', Validators.required],
      paymentPriority: [''],
      originalCreditor: [''],
      proposalAddress: ['']
    });

    this.generalInfoForm.patchValue({
      creditorName: 'Citigroup',
      accountNumber: '1234 5678 9871 1287',
      ownerOfDebt: 'John Doe',
      proposalName: 'Bruce Doe',
      dueDate: new Date(),
      paymentPriority: '1',
      originalCreditor: 'Citygroup',
      proposalAddress: 'address1'
    });
  }

  get maskedAccountNumber(): string {
    const full = this.generalInfoForm.get('accountNumber')?.value || '';
    if (!full) return '';
    const visiblePart = full.slice(-4);
    return '•••• •••• •••• ' + visiblePart;
  }


  toggleAccountVisibility(): void {
    this.showFullAccountNumber = !this.showFullAccountNumber;
  }

  openAddNameDialog(): void {
    const dialogRef = this.dialog.open(ProposalnameDialogComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fullName = [result.firstName, result.middleInitial, result.lastName, result.suffix]
          .filter(x => x)
          .join(' ');

        this.proposalNames.push(fullName);

        this.generalInfoForm.patchValue({ proposalName: fullName });
      }
    });
  }

  //<------ Balance Info -------> 

  @ViewChild('grid') public grid!: GridComponent;

  public gridData = [
    { title: 'Balance', originalInfo: 1333, dmpInfo: 0 },
    { title: 'Monthly Payment', originalInfo: 67, dmpInfo: 0 },
    { title: 'APR', originalInfo: 12, dmpInfo: 0 },
    { title: 'Past Due Amount', originalInfo: 10, dmpInfo: 0 },
    { title: 'Overdue Amount', originalInfo: null, dmpInfo: 0 }
  ];

  ngOnInit(): void {
    const group: any = {};
    this.gridData.forEach(row => {
      group[this.getControlName(row.title)] = [row.dmpInfo, [Validators.required]];
    });
    this.balanceForm = this.fb.group(group);

    this.gridData.forEach(row => {
      const control = this.balanceForm.get(this.getControlName(row.title));
      control?.valueChanges.subscribe(val => {
        let value = val;

        if (typeof value === 'string') {
          if (row.title !== 'APR') {
            value = value.replace(/\$/g, '').replace(/,/g, '');
          } else {
            value = value.replace(/[^0-9.]/g, '');

            const parts = value.split('.');
            if (parts.length > 2) {
              value = parts[0] + '.' + parts[1];
            }
          }
        }

        const num = parseFloat(value);
        if (isNaN(num)) {
          control?.setErrors({ invalid: true });
        }
        else if (num < 0) {
          control?.setErrors({ min: true });
        }
        else if (row.title === 'APR' && num > 99.99) {
          control?.setErrors({ max: true });
        }
        else if (row.title !== 'APR' && num > 9999999.99) {
          control?.setErrors({ max: true });
        }
        else {
          control?.setErrors(null);
        }
        control?.markAsTouched();
        control?.markAsDirty();
        row.dmpInfo = num;
      });
    });
  }


  getControlName(title: string): string {
    return title.replace(/[^a-zA-Z]/g, '');
  }


  getErrorMessage(row: any): string {
    const control = this.balanceForm.get(this.getControlName(row.title));
    if (!control) return '';

    if (control.hasError('required')) return 'This field is required';
    if (row.title === 'APR') {
      if (control.hasError('min')) return 'Minimum APR is 0%';
      if (control.hasError('max')) return 'Maximum APR is 99.99%';
      if (control.hasError('invalid')) return 'Invalid APR value';
    }
    if (row.title !== 'APR') {
      if (control.hasError('min')) return 'Minimum value is $0';
      if (control.hasError('max')) return 'Maximum value is $9,999,999.99';
      if (control.hasError('invalid')) return 'Invalid amount';
    }

    return '';
  }


  openVerificationDialog(row: any) {
    const dialogRef = this.dialog.open(AprVerificationdateDialogComponent, {
      width: '450px',
      data: { aprValue: row.dmpInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        row.verificationDate = result.verificationDate;
      }
    });
  }
}