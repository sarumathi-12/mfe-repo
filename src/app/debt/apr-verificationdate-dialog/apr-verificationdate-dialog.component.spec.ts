import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprVerificationdateDialogComponent } from './apr-verificationdate-dialog.component';

describe('AprVerificationdateDialogComponent', () => {
  let component: AprVerificationdateDialogComponent;
  let fixture: ComponentFixture<AprVerificationdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprVerificationdateDialogComponent]
    });
    fixture = TestBed.createComponent(AprVerificationdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
