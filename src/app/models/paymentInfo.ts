export interface PaymentInfo {
  cartNumber: string;
  cartExpired: string;
  cvvCart: string;
  holder: string;
}

export type KeysPaymentInfo = keyof PaymentInfo;
