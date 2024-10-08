import { removeCookie } from '@/utils'
import { updateProfile } from '../slice/layout.slice'
import { api } from './api.config'
import { ProfileDTO, ProfileResponseDto } from '@/dto'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    profile: builder.query<ProfileResponseDto, void>({
      query: () => '/auth/getProfile',
      providesTags: ['profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            if (data && data?.user) {
              dispatch(updateProfile(data?.user))
            }
          }
          )
          .catch(error => {
            if (error.meta.response?.status === 401) {
              removeCookie('token')
              window.location.replace('/login')
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


    getProfile: builder.mutation<ProfileDTO, { token: string }>({
      query: ({ token }) => ({
        url: '/auth/getProfile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }),
      async onQueryStarted({ token }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data)

        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      },
    }),



  })
})


export const {
  useLazyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetProfileMutation,
} = extendedApi