import { createAction, props } from '@ngrx/store';

export const loadGeneralInfo = createAction('[General] Load General Info');

export const loadGeneralInfoSuccess = createAction(
  '[General] Load General Info Success',
  props<{ generalInfo: any; balanceInfo: any[] }>()
);

export const loadGeneralInfoFailure = createAction(
  '[General] Load General Info Failure',
  props<{ error: any }>()
);
