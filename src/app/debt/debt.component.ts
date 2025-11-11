import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_ENCAPSULATION } from '../_shared/constants/debt.const';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
  encapsulation: DEFAULT_ENCAPSULATION
})
export class DebtComponent {
  public readonly debtTabs = {
    GeneralInfo: 0,
    Transactions: 1,
    ProposalInfo: 2,
  };

  public activeTab = this.debtTabs.GeneralInfo;
}
