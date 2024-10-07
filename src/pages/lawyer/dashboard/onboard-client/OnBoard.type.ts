import { ProfileDTO } from '@/dto'



export type OboardApiResponse = Omit<ProfileDTO, 'modules'> & { token: string }

export type OnBoardPayload = {
  ame: string;
  phone: string;
  email: string;
  password: string;
}


