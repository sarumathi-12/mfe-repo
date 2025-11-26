import { createReducer, on } from '@ngrx/store';
import { initialState } from './general-info.state';
import * as GeneralActions from './general-info.actions';

export const generalInfoReducer = createReducer(
  initialState,

  on(GeneralActions.loadGeneralInfo, (state) => ({
    ...state,
    loading: true
  })),

  on(GeneralActions.loadGeneralInfoSuccess, (state, { generalInfo, balanceInfo }) => ({
    ...state,
    generalInfo,
    balanceInfo,
    loading: false
  })),

  on(GeneralActions.loadGeneralInfoFailure, (state) => ({
    ...state,
    loading: false
  }))
);
