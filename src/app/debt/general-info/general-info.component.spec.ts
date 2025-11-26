import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralInfoComponent } from './general-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => of(null)
    };
  }
}

describe('GeneralInfoComponent', () => {
  let component: GeneralInfoComponent;
  let fixture: ComponentFixture<GeneralInfoComponent>;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();

    await TestBed.configureTestingModule({
      declarations: [GeneralInfoComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  // ================= Component Creation =================
  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  // ================= General Form Initialization =================
  describe('General Form Initialization', () => {
    it('should initialize generalInfoForm with default values', () => {
      const form = component.generalInfoForm.value;
      expect(form.accountNumber).toBe('1234 5678 9871 1287');
      expect(form.ownerOfDebt).toBe('John Doe');
      expect(form.proposalName).toBe('Bruce Doe');
      expect(form.paymentPriority).toBe(1);
      expect(form.originalCreditor).toBe('Citygroup');
      expect(form.proposalAddress).toBe('Address 1');
    });
  });

  // ================= Balance Form Initialization =================
  describe('Balance Form Initialization', () => {
    it('should initialize balanceForm with controls based on gridData', () => {
      expect(component.balanceForm.contains('Balance')).toBeTrue();
      expect(component.balanceForm.contains('MonthlyPayment')).toBeTrue();
      expect(component.balanceForm.contains('APR')).toBeTrue();
      expect(component.balanceForm.contains('PastDueAmount')).toBeTrue();
      expect(component.balanceForm.contains('OverdueAmount')).toBeTrue();
    });
  });

  // ================= Account Number Masking =================
  describe('Account Number Masking', () => {
    it('should mask account number correctly', () => {
      expect(component.maskedAccountNumber).toBe('•••• •••• ••••1287');
    });

    it('should toggle full account visibility', () => {
      expect(component.showFullAccountNumber).toBeFalse();
      component.toggleAccountVisibility();
      expect(component.showFullAccountNumber).toBeTrue();
    });
  });

  // ================= getControlName =================
  describe('getControlName', () => {
    it('should return empty string when title has no letters', () => {
      expect(component.getControlName('123@$%')).toBe('');
    });
  });

  // ================= Proposal Name Dialog =================
  describe('Proposal Name Dialog', () => {
    it('should open add name dialog', () => {
      const spy = spyOn(dialog, 'open').and.callThrough();
      component.openAddNameDialog();
      expect(spy).toHaveBeenCalled();
    });

    it('should add proposal name after dialog close', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of({ firstName: 'Saru', lastName: 'Sugumar', middleInitial: '', suffix: '' })
      });
      component.openAddNameDialog();
      expect(component.proposalNames.includes('Saru Sugumar')).toBeTrue();
    });
  });

  // ================= Min Date =================
  describe('Minimum Date', () => {
    it('should set minDate to tomorrow', () => {
      const today = new Date();
      const expected = new Date(today);
      expected.setDate(today.getDate() + 1);
      expect(component.minDate.toDateString()).toBe(expected.toDateString());
    });
  });

  // ================= Balance Field Validation =================
  describe('Balance Field Validation', () => {
    it('should set error when APR > 99.99', () => {
      const control = component.balanceForm.get('APR');
      control?.setValue(120);
      expect(control?.hasError('max')).toBeTrue();
    });

    it('should set max error when non-APR value exceeds limit', () => {
      const control = component.balanceForm.get('Balance');
      control?.setValue(10000000);
      expect(control?.hasError('max')).toBeTrue();
    });

    it('should set error when value is negative', () => {
      const control = component.balanceForm.get('Balance');
      control?.setValue(-50);
      expect(control?.hasError('min')).toBeTrue();
    });

    it('should accept valid balance value', () => {
      const control = component.balanceForm.get('Balance');
      control?.setValue(100);
      expect(control?.errors).toBeNull();
    });

    it('should set invalid error when non-APR value is not a number', () => {
      const control = component.balanceForm.get('Balance');
      control?.setValue('abc');
      expect(control?.hasError('invalid')).toBeTrue();
    });
  });

  // ================= Balance Error Messages =================
  describe('Balance Error Messages', () => {
    it('should return non-APR max error message', () => {
      const row = component.gridData.find(r => r.title === 'Balance')!;
      const control = component.balanceForm.get('Balance');
      control?.setErrors({ max: true });
      expect(component.getErrorMessage(row)).toBe('Maximum value is $9,999,999.99');
    });

    it('should return non-APR min error message', () => {
      const row = component.gridData.find(r => r.title === 'Balance')!;
      const control = component.balanceForm.get('Balance');
      control?.setErrors({ min: true });
      expect(component.getErrorMessage(row)).toBe('Minimum value is $0');
    });

    it('should return non-APR invalid message', () => {
      const row = component.gridData.find(r => r.title === 'Balance')!;
      const control = component.balanceForm.get('Balance');
      control?.setErrors({ invalid: true });
      expect(component.getErrorMessage(row)).toBe('Invalid amount');
    });

    it('should return required message', () => {
      const row = component.gridData.find(r => r.title === 'Balance')!;
      const control = component.balanceForm.get('Balance');
      control?.setErrors({ required: true });
      expect(component.getErrorMessage(row)).toBe('This field is required');
    });
  });

  // ================= APR Dialog =================
  describe('APR Dialog', () => {
    it('should open APR verification dialog', () => {
      const spy = spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of({ verificationDate: new Date('2024-01-01') })
      });
      const aprRow: any = component.gridData.find(r => r.title === 'APR');
      component.openVerificationDialog(aprRow);
      expect(spy).toHaveBeenCalled();
      expect(aprRow.verificationDate).toEqual(new Date('2024-01-01'));
    });

    it('should set verificationDate when dialog returns a value', () => {
      const aprRow: any = { title: 'APR', dmpInfo: 12 };
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of({ verificationDate: new Date('2024-01-01') })
      });
      component.openVerificationDialog(aprRow);
      expect(aprRow.verificationDate).toEqual(new Date('2024-01-01'));
    });

    it('should NOT set verificationDate when dialog returns null', () => {
      const aprRow: any = { title: 'APR', dmpInfo: 10 };
      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) });
      component.openVerificationDialog(aprRow);
      expect(aprRow.verificationDate).toBeUndefined();
    });

    it('should set invalid error when APR is not a number', () => {
      const control = component.balanceForm.get('APR');
      control?.setValue('abc');
      expect(control?.hasError('invalid')).toBeTrue();
    });

    it('should return APR max error message', () => {
      const row = component.gridData.find(r => r.title === 'APR')!;
      const control = component.balanceForm.get('APR');
      control?.setErrors({ max: true });
      expect(component.getErrorMessage(row)).toBe('Maximum APR is 99.99%');
    });

    it('should return APR min error message', () => {
      const row = component.gridData.find(r => r.title === 'APR')!;
      const control = component.balanceForm.get('APR');
      control?.setErrors({ min: true });
      expect(component.getErrorMessage(row)).toBe('Minimum APR is 0%');
    });

    it('should return APR invalid message', () => {
      const row = component.gridData.find(r => r.title === 'APR')!;
      const control = component.balanceForm.get('APR');
      control?.setErrors({ invalid: true });
      expect(component.getErrorMessage(row)).toBe('Invalid APR value');
    });

    it('should clear errors when valid APR value is provided', () => {
      const control = component.balanceForm.get('APR');
      control?.setValue(15);
      expect(control?.errors).toBeNull();
    });
  });
});
