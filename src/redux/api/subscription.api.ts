import { api } from './api.config'
import { SubscriptionPlanDTO } from '@/dto'
import { setSubscriptionPlan } from '../slice/subscription.slice'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    createCheckoutSession: builder.mutation<{ sessionUrl: string, sessionId: string }, { subscriptionPlanId: number, successUrl: string, cancelUrl: string }>({
      query: (body) => ({ url: '/v1/Subscription/createCheckoutSession', method: 'POST', body, headers: { hideToast: 'true' } }),
    }),

    createSubscription: builder.mutation<void, { sessionId: string }>({
      query: (body) => ({ url: '/v1/Subscription/createSubscription', method: 'POST', body, headers: { hideToast: 'true' } }),
      invalidatesTags: (result, error) => !error ? ['profile'] : [],
    }),

    updateSubscription: builder.mutation<void, Partial<SubscriptionPlanDTO>>({
      query: ({ id, ...body }) => ({ url: `/v1/Subscription/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'subscription', id }] : [],
    }),

    getSubscriptionPlan: builder.query<SubscriptionPlanDTO, void>({
      query: () => `/v1/Organization/subscriptionPlan`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(setSubscriptionPlan(data)))
          .catch(error => { })
      }
    }),

    getSubscription: builder.query<SubscriptionPlanDTO, number>({
      query: (id) => `/v1/Subscription/${id}`,
      providesTags: (result, error, id) => !error ? [{ type: 'subscription', id }] : []
    }),

    getSubscriptionList: builder.query<SubscriptionPlanDTO[], void>({
      query: () => ({ url: `/v1/Subscription/all` }),
      providesTags: (result, error) => !error ? [...result!.map(({ id }) => ({ type: 'subscription' as const, id })), { type: 'subscription', id: 'LIST' }] : [{ type: 'subscription', id: 'LIST' }]
    }),

  })
})


export const {
  useCreateCheckoutSessionMutation,
  useCreateSubscriptionMutation,
  useGetSubscriptionListQuery,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useLazyGetSubscriptionPlanQuery
} = extendedApi