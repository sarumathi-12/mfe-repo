import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprVerificationdateDialogComponent } from './apr-verificationdate-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AprVerificationdateDialogComponent', () => {
  let component: AprVerificationdateDialogComponent;
  let fixture: ComponentFixture<AprVerificationdateDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AprVerificationdateDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [AprVerificationdateDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { aprValue: 12 } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AprVerificationdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  TEST 1 : Component Created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  TEST 2 : Form Should Be Invalid Initially
  it('should have an invalid form when empty', () => {
    expect(component.verificationForm.valid).toBeFalse();
  });

   //  TEST 3 :  Form Should Become Valid After Date Set
  it('should validate the form when date is entered', () => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() - 1);

    component.verificationForm.get('verificationDate')?.setValue(mockDate);
    fixture.detectChanges();  

    expect(component.verificationForm.valid).toBeTrue(); 
  });


   //  TEST 4 : Save() Should Close Dialog With Date
  it('should close dialog with verification date on save', () => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() - 1);

    component.verificationForm.get('verificationDate')?.setValue(mockDate);
    fixture.detectChanges();   
    component.save();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      verificationDate: mockDate
    });
  });


   //  TEST 5 : Cancel Should Close Without Data
  it('should close dialog without data when cancel is clicked', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

});
