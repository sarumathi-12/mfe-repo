import { TestBed } from '@angular/core/testing';
import { GeneralInfoService } from './general-info.service';
import { BALANCE_INFO_DATA, GENERAL_INFO_DATA } from '../data/general-info.data';

describe('GeneralInfoService', () => {
  let service: GeneralInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralInfoService]
    });

    service = TestBed.inject(GeneralInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return general info data', (done) => {
    service.getGeneralInfo().subscribe(data => {
      expect(data).toEqual(GENERAL_INFO_DATA);
      done();
    });
  });

  it('should return balance info data', (done) => {
    service.getBalanceInfo().subscribe(data => {
      expect(data).toEqual(BALANCE_INFO_DATA);
      expect(Array.isArray(data)).toBeTrue();
      done();
    });
  });
});
