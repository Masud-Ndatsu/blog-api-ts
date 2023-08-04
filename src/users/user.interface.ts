export interface IAddress {
  street: string;
  city: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: IAddress;
}
