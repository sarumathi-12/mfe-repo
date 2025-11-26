import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProposalnameDialogComponent } from "./proposalname-dialog.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";

describe('ProposalNameDialogComponent', () => {
  let component: ProposalnameDialogComponent;
  let fixture: ComponentFixture<ProposalnameDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProposalnameDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [ProposalnameDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalnameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //  TEST 1 : Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  TEST 2 : Form should be invalid initially
  it('should have an invalid form initially', () => {
    expect(component.addNameForm.valid).toBeFalse();
  });

  //  TEST 3 :Form valid when required fields set 
  it('should become valid when first and last name are entered', () => {
    component.addNameForm.get('firstName')?.setValue('John');
    component.addNameForm.get('lastName')?.setValue('Doe');

    fixture.detectChanges();

    expect(component.addNameForm.valid).toBeTrue();
  });

  //  TEST 4 submit() should close dialog with form data
  it('should close dialog with form data on submit', () => {
    component.addNameForm.setValue({
      firstName: 'John',
      middleInitial: '',
      lastName: 'Doe',
      suffix: 'Jr.'
    });

    fixture.detectChanges();
    component.submit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      firstName: 'John',
      middleInitial: '',
      lastName: 'Doe',
      suffix: 'Jr.'
    });
  });

  //  TEST 5 submit() should not close if form invalid 
  it('should NOT close dialog if form is invalid', () => {
    component.addNameForm.get('firstName')?.setValue('');
    component.addNameForm.get('lastName')?.setValue('');

    component.submit();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  //  TEST 6 cancel() should close dialog
  it('should close dialog without data when cancel is clicked', () => {
    component.cancel();

    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

});