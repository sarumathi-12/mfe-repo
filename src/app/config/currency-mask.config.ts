import { CurrencyMaskConfig } from "ng2-currency-mask";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};
