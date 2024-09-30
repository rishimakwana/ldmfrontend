import { api } from './api.config'
import { AuthApiResponse } from '@/pages/auth/Auth.type'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<AuthApiResponse, { email: string, password: string }>({
      query: (body) => ({
        url: '/v1/Auth/login',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    register: builder.mutation<AuthApiResponse, { firstName: string, lastName: string, phone: string, email: string, countryId: number, password: string, customerOrganizationTypeId: number, customerOrganizationName: string }>({
      query: (body) => ({
        url: '/v1/Auth/register',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

  })
})


export const {
  useLoginMutation,
  useRegisterMutation,
} = extendedApi