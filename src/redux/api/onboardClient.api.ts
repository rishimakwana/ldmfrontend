import { AuthApiResponse } from '@/pages/lawyer/auth/Auth.type'
import { api } from './api.config'
// import { OboardApiResponse } from '@/pages/lawyer/dashboard/onboard-client/OnBoard.type'
import { ClientAddressUpdate, ClientPasswordUpdate } from '@/pages/client/auth/address/OnboardAddressAndPassword.type'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    clientOnboard: builder.mutation<any, { fullName: string, email: string, number: string }>({
      query: (body) => ({
        url: '/lawyer/addClient',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    clientDetails: builder.mutation<AuthApiResponse, ClientAddressUpdate | ClientPasswordUpdate>({
      query: (args) => {
        const { token, ...body } = args;
        const step = 'step1' in args ? args.step1 : 'step2' in args ? args.step2 : '';

        return {
          url: `/client/auth/updateClient?step=${step}`,
          method: 'POST',
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),






  })
})


export const {
  useClientOnboardMutation,
  useClientDetailsMutation,
} = extendedApi