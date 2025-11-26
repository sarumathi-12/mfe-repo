import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GeneralActions from '../../store/general-info/general-info.actions';
import * as GeneralSelectors from '../../store/general-info/general-info.selectors';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
 constructor(private store: Store) {}

  ngOnInit(): void {

    // 1. Load mock data
    this.store.dispatch(GeneralActions.loadGeneralInfo());

    // 2. Subscribe to store
    this.store.select(GeneralSelectors.selectGeneralInfo)
      .subscribe(data => {
        console.log("General Info from Store:", data);
      });

    this.store.select(GeneralSelectors.selectBalanceInfo)
      .subscribe(data => {
        console.log("Balance Info from Store:", data);
      });
  }
}
