export type ClientAddressUpdate = {
  street: string;
  city: string;
  zipCode: string;
  state: string;
  status: string;
  token: string;
  step1: any;
};

export type ClientPasswordUpdate = {
  password: string,
  token: string,
  step2: any
}