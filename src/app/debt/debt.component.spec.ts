import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebtComponent } from './debt.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { DEBT_TABS, DEBT_TABS_MAP } from '../_shared/constants/debt.const';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DebtComponent', () => {
  let component: DebtComponent;
  let fixture: ComponentFixture<DebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtComponent],
      imports: [MatTabsModule,
        NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]   
    }).compileComponents();

    fixture = TestBed.createComponent(DebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //  TEST 1 : Component Creates
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

   //  TEST 2 : Should start with default active tab
  it('should default to activeTab = 0', () => {
    expect(component.activeTab).toBe(0);
  });

  //  TEST 3 : Should change activeTab 
  it('should update activeTab when changed', () => {
    component.activeTab = 1;
    fixture.detectChanges();

    expect(component.activeTab).toBe(1);
  });

   //  TEST 4 : Should show General Info when GeneralInfo tab is active 
  it('should show <app-general-info> when GeneralInfo tab is selected', () => {
    component.activeTab = DEBT_TABS_MAP.GeneralInfo; 
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const generalInfo = compiled.querySelector('app-general-info');

    expect(generalInfo).toBeTruthy();
  });
});
