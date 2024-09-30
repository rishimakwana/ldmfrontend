import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { EventDTO } from '@/dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    createEvent: builder.mutation<void, Omit<EventDTO, 'id' | 'hotels' | 'accessibilityInfoData'>>({
      query: (body) => ({ url: '/v1/Events', method: 'POST', body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'event', id: 'LIST' }] : [],
    }),

    updateEvent: builder.mutation<void, Omit<EventDTO, 'hotels' | 'accessibilityInfoData'>>({
      query: ({ id, ...rest }) => ({ url: `/v1/Events/${id}`, method: 'PUT', body: rest }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'event', id }] : [],
    }),

    deleteEvent: builder.mutation<void, number>({
      query: (id) => ({ url: `/v1/Events/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => !error ? [{ type: 'event', id }, { type: 'event', id: 'LIST' }] : [],
    }),

    getEvent: builder.query<EventDTO, { eventId: number, bankDetails?: boolean }>({
      query: ({ eventId, bankDetails = false }) => `/v1/Events/${eventId}?bankDetails=${bankDetails}`,
      providesTags: (result, error, { eventId }) => !error ? [{ type: 'event', id: eventId }] : []
    }),

    getEventsList: builder.query<PaginationApiResponse<EventDTO>, Pagination>({
      query: (params) => ({ url: `/v1/Events/all`, params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'event' as const, id })), { type: 'event', id: 'LIST' }] : [{ type: 'event', id: 'LIST' }]
    }),

    getPublicEvent: builder.query<EventDTO, number>({
      query: (id) => ({ url: `/v1/Events/public/${id}` }),
      providesTags: (result, error, id) => !error ? [{ type: 'event', id }] : []
    }),

    getPublicEventsList: builder.query<PaginationApiResponse<EventDTO>, Pagination & { status?: EventDTO['status'] }>({
      query: (params) => ({ url: '/v1/Events/public/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'event' as const, id })), { type: 'event', id: 'LIST' }] : [{ type: 'event', id: 'LIST' }]
    }),

  })
})


export const {
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventQuery,
  useGetEventsListQuery,
  useGetPublicEventQuery,
  useGetPublicEventsListQuery,
} = extendedApi