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
  public generalInfoForm!: FormGroup;
  public balanceForm!: FormGroup;
  public minDate!: Date;
  public showFullAccountNumber = false;
  public proposalNames: string[] = ['Bruce Doe', 'Monica Geller'];
  public ownerOptions = [
    'John Doe',
    'Jane Doe'
  ];

  public paymentPriorityOptions = [1, 2, 3];

  public proposalAddress = ['Address 1', 'Address 2']

  private readonly fieldRules: any = {
    APR: {
      max: 99.99,
      min: 0,
      minError: 'Minimum APR is 0%',
      maxError: 'Maximum APR is 99.99%',
      invalidError: 'Invalid APR value'
    },
    DEFAULT: {
      max: 9999999.99,
      min: 0,
      minError: 'Minimum value is $0',
      maxError: 'Maximum value is $9,999,999.99',
      invalidError: 'Invalid amount'
    }
  };


  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  private createGeneralForm() {
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

    // default values
    this.generalInfoForm.patchValue({
      creditorName: 'Citigroup',
      accountNumber: '1234 5678 9871 1287',
      ownerOfDebt: 'John Doe',
      proposalName: 'Bruce Doe',
      dueDate: new Date(),
      paymentPriority: 1,
      originalCreditor: 'Citygroup',
      proposalAddress: 'Address 1'
    });
  }

  private setMinDate() {
    const today = new Date();
    this.minDate = new Date(today);
    this.minDate.setDate(today.getDate() + 1);
  }

  public get maskedAccountNumber(): string {
    const full = this.generalInfoForm.get('accountNumber')?.value || '';
    if (!full) return '';
    const visiblePart = full.slice(-4);
    return '•••• •••• ••••' + visiblePart;
  }


  public toggleAccountVisibility(): void {
    this.showFullAccountNumber = !this.showFullAccountNumber;
  }

  public openAddNameDialog(): void {
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
    this.createGeneralForm();
    this.setMinDate();

    this.createBalanceForm();
    this.subscribeToBalanceChanges();
  }

  private createBalanceForm() {
    const group: any = {};
    this.gridData.forEach(r =>
      group[this.getControlName(r.title)] = [r.dmpInfo, Validators.required]
    );
    this.balanceForm = this.fb.group(group);
  }

  private subscribeToBalanceChanges() {
    this.gridData.forEach(row => {
      const control = this.balanceForm.get(this.getControlName(row.title));
      control?.valueChanges.subscribe(val =>
        this.validateBalanceField(val, row, control)
      );
    });
  }

  private validateBalanceField(value: any, row: any, control: any) {
    const num = Number(value);
    const rules = row.title === 'APR' ? this.fieldRules.APR : this.fieldRules.DEFAULT;

    if (isNaN(num)) control.setErrors({ invalid: true });
    else if (num < rules.min) control.setErrors({ min: true });
    else if (num > rules.max) control.setErrors({ max: true });
    else control.setErrors(null);

    control.markAsTouched();
    control.markAsDirty();

    row.dmpInfo = num;
  }


  public getControlName(title: string): string {
    return title.replace(/[^a-zA-Z]/g, '');
  }

  public getErrorMessage(row: any): string {
    const control = this.balanceForm.get(this.getControlName(row.title));
    if (!control) return '';

    if (control.hasError('required')) return 'This field is required';

    const rules = row.title === 'APR' ? this.fieldRules.APR : this.fieldRules.DEFAULT;

    if (control.hasError('min')) return rules.minError;
    if (control.hasError('max')) return rules.maxError;
    if (control.hasError('invalid')) return rules.invalidError;

    return '';
  }

  public openVerificationDialog(row: any) {
    const dialogRef = this.dialog.open(AprVerificationdateDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        row.verificationDate = result.verificationDate;
      }
    });
  }
}