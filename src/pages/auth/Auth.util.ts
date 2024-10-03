import { setCookie } from '@/utils'
import { AuthApiResponse } from './Auth.type'



export const setUser = (profile: AuthApiResponse) => {
  setCookie('token', profile.token, 30)
  const redirectUrl = profile.role === 'customer' ? '/' : '/lawyer/dashboard/home'

  window.location.replace(redirectUrl)
}