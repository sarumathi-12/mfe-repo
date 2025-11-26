import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSelectComponent } from './shared-select.component';

describe('SharedSelectComponent', () => {
  let component: SharedSelectComponent;
  let fixture: ComponentFixture<SharedSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedSelectComponent]
    });
    fixture = TestBed.createComponent(SharedSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
