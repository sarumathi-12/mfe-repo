import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteEntryComponent } from './remote-entry.component';

describe('RemoteEntryComponent', () => {
  let component: RemoteEntryComponent;
  let fixture: ComponentFixture<RemoteEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteEntryComponent]
    });
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
