import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DebtComponent {
  debtTabs = {
    GeneralInfo: 0,
    Transactions: 1,
    ProposalInfo: 2,
  };

  activeTab = this.debtTabs.GeneralInfo;
}
