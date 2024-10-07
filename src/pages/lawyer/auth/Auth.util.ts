import { setCookie } from '@/utils'
import { AuthApiResponse } from './Auth.type'


export const setUser = (profile: AuthApiResponse) => {

  setCookie('token', profile.token, 30)
  const redirectUrl = profile.roleId == 3 ? '/client/dashboard' : '/lawyer/dashboard'

  window.location.replace(redirectUrl)
}