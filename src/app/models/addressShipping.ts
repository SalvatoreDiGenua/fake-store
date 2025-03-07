export interface AddressShipping {
  name: string;
  surname: string;
  email: string;
  cellphone: string;
  telephone: string;
  state: string;
  city: string;
  address: string;
  streetNumber: number;
}

export type KeysAddressShipping = keyof AddressShipping;
