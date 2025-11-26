import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BALANCE_INFO_DATA, GENERAL_INFO_DATA } from '../data/general-info.data';

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {

  constructor() { }

   getGeneralInfo(): Observable<any> {
    return of(GENERAL_INFO_DATA);
  }

  getBalanceInfo(): Observable<any[]> {
    return of(BALANCE_INFO_DATA);
  }
}
