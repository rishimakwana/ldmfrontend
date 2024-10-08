import { api } from './api.config'

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


  })
})


export const {
  useClientOnboardMutation,
} = extendedApi