import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as GeneralActions from '../../store/general-info/general-info.actions';
import * as GeneralSelectors from '../../store/general-info/general-info.selectors';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let storeMock: any;

  beforeEach(async () => {
    // Mock Store
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select')
    };

    await TestBed.configureTestingModule({
      declarations: [TransactionComponent],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGeneralInfo on ngOnInit', () => {
    storeMock.select.and.returnValue(of([]));
    component.ngOnInit();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      GeneralActions.loadGeneralInfo()
    );
  });

  it('should subscribe to selectGeneralInfo selector', () => {
    const mockGeneralInfo = { name: 'John Doe' };
    
    storeMock.select.and.callFake((selector: any) => {
      if (selector === GeneralSelectors.selectGeneralInfo) {
        return of(mockGeneralInfo);
      }
      return of(null);
    });

    spyOn(console, 'log');

    component.ngOnInit();

    expect(storeMock.select).toHaveBeenCalledWith(GeneralSelectors.selectGeneralInfo);
    expect(console.log).toHaveBeenCalledWith(
      'General Info from Store:', 
      mockGeneralInfo
    );
  });

  it('should subscribe to selectBalanceInfo selector', () => {
    const mockBalanceInfo = [{ balance: 100 }];

    storeMock.select.and.callFake((selector: any) => {
      if (selector === GeneralSelectors.selectBalanceInfo) {
        return of(mockBalanceInfo);
      }
      return of(null);
    });

    spyOn(console, 'log');

    component.ngOnInit();

    expect(storeMock.select).toHaveBeenCalledWith(GeneralSelectors.selectBalanceInfo);
    expect(console.log).toHaveBeenCalledWith(
      'Balance Info from Store:', 
      mockBalanceInfo
    );
  });
});
