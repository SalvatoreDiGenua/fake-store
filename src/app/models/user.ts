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

export const LOGIN_GUEST: User = {
  address: {
    geolocation: {
      lat: null,
      long: null,
    },
    city: null,
    street: null,
    number: null,
    zipcode: null,
  },
  id: -1,
  email: 'user.guest@fakestore.com',
  username: 'Guest',
  password: 'guest',
  name: {
    firstname: 'User',
    lastname: 'Guest',
  },
  phone: null,
};

export interface NewUsersPayload {
  username: string;
  email: string;
  password: string;
}

export type UpdateUserPayload = Omit<NewUsersPayload, 'password'>;
