import { Component, ViewEncapsulation } from '@angular/core';
import { DEBT_TABS, DEBT_TABS_MAP } from '../_shared/constants/debt.const';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DebtComponent {
public activeTab = 0;

  public tabs = DEBT_TABS;             
  public debtTabs = DEBT_TABS_MAP;
}