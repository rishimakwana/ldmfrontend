export type ProfileDTO = {
  id: number;
  userId: number;
  profilePicUrl: string | null;
  firmName: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  drivingLicenseFront: string;
  drivingLicenseBack: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  phone: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Disapproved' | 'Not Applied';
  gender: string | null;
  roleId: number;
}

export type ProfileResponseDto = {
  statusCode: number;
  message: string;
  user: ProfileDTO;
}