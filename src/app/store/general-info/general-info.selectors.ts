import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralInfoState } from './general-info.state';

export const selectGeneralInfoState =
  createFeatureSelector<GeneralInfoState>('generalInfo');

export const selectGeneralInfo = createSelector(
  selectGeneralInfoState,
  state => state.generalInfo
);

export const selectBalanceInfo = createSelector(
  selectGeneralInfoState,
  state => state.balanceInfo
);

export const selectLoading = createSelector(
  selectGeneralInfoState,
  state => state.loading
);
