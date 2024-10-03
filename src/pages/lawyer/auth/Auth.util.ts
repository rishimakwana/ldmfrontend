import { setCookie } from '@/utils'
import { AuthApiResponse } from './Auth.type'



export const setUser = (profile: AuthApiResponse) => {
  setCookie('token', profile.token, 30)
  const redirectUrl = '/lawyer/dashboard/onboard-client'

  window.location.replace(redirectUrl)
}