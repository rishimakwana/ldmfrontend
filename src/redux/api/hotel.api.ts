import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { HotelDTO } from '@/dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addHotel: builder.mutation<void, Omit<HotelDTO, 'id' | 'country'>>({
      query: (body) => ({ url: '/v1/Hotel', method: 'POST', body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'hotel', id: 'LIST' }] : [],
    }),

    updateHotel: builder.mutation<void, Omit<HotelDTO, 'country'>>({
      query: ({ id, ...body }) => ({ url: `/v1/Hotel/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'hotel', id }] : [],
    }),

    deleteHotel: builder.mutation<void, number>({
      query: (id) => ({ url: `/v1/Hotel/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => !error ? [{ type: 'hotel', id }, { type: 'hotel', id: 'LIST' }] : [],
    }),

    getHotel: builder.query<HotelDTO, number>({
      query: (id) => `/v1/Hotel/${id}`,
      providesTags: (result, error, id) => !error ? [{ type: 'hotel', id }] : []
    }),

    getHotelList: builder.query<PaginationApiResponse<HotelDTO>, Pagination>({
      query: (params) => ({ url: `/v1/Hotel/all`, params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'hotel' as const, id })), { type: 'hotel', id: 'LIST' }] : [{ type: 'hotel', id: 'LIST' }]
    }),

  })
})


export const {
  useGetHotelQuery,
  useGetHotelListQuery,
  useAddHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = extendedApi