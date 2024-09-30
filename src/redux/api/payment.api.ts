import { api } from './api.config'
import { PaymentProviderDTO } from '@/dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addPaymentProvider: builder.mutation<void, Omit<PaymentProviderDTO, 'id' | 'isProduction'>>({
      query: (body) => ({ url: '/v1/Organization/addPaymentProvider', method: 'POST', body }),
      invalidatesTags: (result, error) => !error ? ['payment'] : [],
    }),

    getPaymentProvider: builder.query<PaymentProviderDTO, void>({
      query: () => ({ url: `/v1/Organization/paymentProvider` }),
      providesTags: ['payment'],
    }),

  })
})


export const {
  useAddPaymentProviderMutation,
  useGetPaymentProviderQuery,
} = extendedApi