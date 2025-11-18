import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //  TEST 1: Component Creates
  it('should create', () => {
    expect(component).toBeTruthy();
  });


 //  TEST 2: Should render name
  it('should display the name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameText = compiled.querySelector('.logo-text h2');

    expect(nameText?.textContent?.trim()).toBe('Sarumathi Sugumar');
  });

});
