export interface GeneralInfoState {
  generalInfo: any;
  balanceInfo: any[];
  loading: boolean;
}

export const initialState: GeneralInfoState = {
  generalInfo: null,
  balanceInfo: [],
  loading: false
};
