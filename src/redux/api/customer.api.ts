import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { CustomerDTO } from '@/dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getCustomerList: builder.query<PaginationApiResponse<CustomerDTO>, Pagination>({
      query: (params) => ({ url: `/v1/User/all`, params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'customer' as const, id })), { type: 'customer', id: 'LIST' }] : [{ type: 'customer', id: 'LIST' }]
    }),

  })
})


export const {
  useGetCustomerListQuery,
} = extendedApi