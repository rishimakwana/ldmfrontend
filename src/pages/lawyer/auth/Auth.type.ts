import { ProfileDTO } from '@/dto'



export type AuthApiResponse = Omit<ProfileDTO, 'modules'> & { token: string }

export type RegisterPayload = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  firmName: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  drivingLicenseFront: File | string;
  drivingLicenseBack: File | string;
}