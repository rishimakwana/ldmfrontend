import { AuthApiResponse, RegisterPayload1, RegisterPayload2 } from '@/pages/lawyer/auth/Auth.type'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    lawyerLogin: builder.mutation<AuthApiResponse, { email: string, password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    lawyerRegister: builder.mutation<AuthApiResponse, RegisterPayload1 | RegisterPayload2 >({
      query: (body) => ({
        url: '/lawyer/auth/register',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

  })
})


export const {
  useLawyerLoginMutation,
  useLawyerRegisterMutation,
} = extendedApi