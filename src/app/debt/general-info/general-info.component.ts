import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProposalnameDialogComponent } from '../proposalname-dialog/proposalname-dialog.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AprVerificationdateDialogComponent } from '../apr-verificationdate-dialog/apr-verificationdate-dialog.component';
import { GeneralInfoService } from '../services/general-info.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  public generalInfoForm!: FormGroup;
  public balanceForm!: FormGroup;

  public minDate!: Date;
  public showFullAccountNumber = false;

  public ownerOptions: string[] = [];
  public proposalNames: string[] = [];
  public paymentPriorityOptions: number[] = [];
  public proposalAddress: string[] = [];

  public gridData: any[] = [];

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

  @ViewChild('grid') public grid!: GridComponent;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.loadGeneralInfo();   
    this.loadBalanceInfo();   
    this.setMinDate();
  }

  private loadGeneralInfo(): void {
    this.generalInfoService.getGeneralInfo().subscribe(data => {

      this.ownerOptions = data.ownerOptions;
      this.proposalNames = data.proposalNames;
      this.paymentPriorityOptions = data.paymentPriorityOptions;
      this.proposalAddress = data.proposalAddress;

      this.createGeneralForm(data);
    });
  }

  private loadBalanceInfo(): void {
    this.generalInfoService.getBalanceInfo().subscribe(data => {
      this.gridData = data;
      this.createBalanceForm();
      this.subscribeToBalanceChanges();
    });
  }


  private createGeneralForm(data: any) {
    this.generalInfoForm = this.fb.group({
      creditorName: [{ value: data.creditorName, disabled: true }],
      accountNumber: [data.accountNumber],
      ownerOfDebt: [data.defaultValues.ownerOfDebt, Validators.required],
      proposalName: [data.defaultValues.proposalName],
      dueDate: [data.defaultValues.dueDate, Validators.required],
      paymentPriority: [data.defaultValues.paymentPriority],
      originalCreditor: [data.defaultValues.originalCreditor],
      proposalAddress: [data.defaultValues.proposalAddress]
    });
  }

  private setMinDate() {
    const today = new Date();
    this.minDate = new Date(today);
    this.minDate.setDate(today.getDate() + 1);
  }


  public get maskedAccountNumber(): string {
    const full = this.generalInfoForm?.get('accountNumber')?.value || '';
    const visible = full.slice(-4);
    return '•••• •••• •••• ' + visible;
  }

 onAddProposalNameClick = () => {
  this.openAddNameDialog();
};

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

        this.proposalNames = [...this.proposalNames, fullName];
        this.generalInfoForm.patchValue({ proposalName: fullName });
      }
    });
  }


  private createBalanceForm() {
    const group: any = {};

    this.gridData.forEach(row => {
      group[this.getControlName(row.title)] = [row.dmpInfo, Validators.required];
    });

    this.balanceForm = this.fb.group(group);
  }

  private subscribeToBalanceChanges() {
    this.gridData.forEach(row => {
      const control = this.balanceForm.get(this.getControlName(row.title));

      control?.valueChanges.subscribe(value => {
        this.validateBalanceField(value, row, control);
      });
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
      if (result) row.verificationDate = result.verificationDate;
    });
  }
}
