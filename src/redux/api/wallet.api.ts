import { api } from './api.config'
import { WalletDTO } from '@/dto/Wallet.dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addWalletTopUp: builder.mutation<{ sessionId: string, paymentRedirectUrl: string }, { amount: number, successUrl: string, cancelUrl: string }>({
      query: (body) => ({
        url: '/v1/Customer/wallet/session',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      })
    }),

    getWalletBalance: builder.query<WalletDTO, void>({
      query: () => ({ url: '/v1/Customer/wallet' }),
      providesTags: (result, error) => !error ? ['wallet'] : []
    }),

  })
})


export const {
  useAddWalletTopUpMutation,
  useGetWalletBalanceQuery,
} = extendedApi