export interface User {
  address: UserAddress;
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  phone: string;
}

export interface UserAddress {
  geolocation: UserGeolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface UserGeolocation {
  lat: string;
  long: string;
}

export interface UserName {
  firstname: string;
  lastname: string;
}
