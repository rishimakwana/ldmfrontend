import { ProfileDTO } from '@/dto'



export type AuthApiResponse = Omit<ProfileDTO, 'modules'> & { token: string }