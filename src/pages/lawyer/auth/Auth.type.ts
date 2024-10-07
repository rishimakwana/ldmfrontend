import { ProfileDTO } from '@/dto'



export type AuthApiResponse = Omit<ProfileDTO, 'modules'> & { token: string }

export type RegisterPayload1 = {
  fullName: string;
  gender : string;
  phone: string;
  email: string;
  password: string;
  drivingLicenseFront: File | string;
  drivingLicenseBack: File | string;
}

export type RegisterPayload2 = {
  userId : string
  firmName: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
}
