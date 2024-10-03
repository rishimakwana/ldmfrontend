import { removeCookie } from '@/utils'
import { updateProfile } from '../slice/layout.slice'
import { api } from './api.config'
import { ProfileDTO } from '@/dto'
import { Module } from '@/types'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    profile: builder.query<ProfileDTO & { modules: Record<string, Module> }, void>({
      query: () => '/v1/User/profile',
      providesTags: ['profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(updateProfile(data)))
          .catch(error => {
            if (error.meta.response?.status === 401) {
              removeCookie('token')
              window.location.replace('/auth/login')
            }
          })
      }
    }),

    updateProfile: builder.mutation<void, Partial<ProfileDTO>>({
      query: (body) => ({ url: '/v1/User/profile/update', method: 'PUT', body }),
      invalidatesTags: (result, error) => !error ? ['profile'] : [],
    }),

    changePassword: builder.mutation<void, { userId: number, oldPassword: string, password: string, confirmPassword: string }>({
      query: (body) => ({
        url: '/v1/Auth/changePassword',
        method: 'PUT',
        body,
      }),
    }),

  })
})


export const {
  useLazyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = extendedApi