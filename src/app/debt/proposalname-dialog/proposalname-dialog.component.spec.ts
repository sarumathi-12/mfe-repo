import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalnameDialogComponent } from './proposalname-dialog.component';

describe('ProposalnameDialogComponent', () => {
  let component: ProposalnameDialogComponent;
  let fixture: ComponentFixture<ProposalnameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalnameDialogComponent]
    });
    fixture = TestBed.createComponent(ProposalnameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
