import { Pagination, PaginationApiResponse } from '@/types'
import { api } from './api.config'
import { TicketDTO } from '@/dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTicket: builder.mutation<number, Pick<TicketDTO, 'message' | 'subject'>>({
      query: (body) => ({ url: '/v1/Customer/ticket', method: 'POST', body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'ticket', id: 'LIST' }] : [],
    }),

    getTicketList: builder.query<PaginationApiResponse<TicketDTO>, Pagination>({
      query: (params) => ({ url: '/v1/Customer/tickets/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'ticket' as const, id })), { type: 'ticket', id: 'LIST' }] : [{ type: 'ticket', id: 'LIST' }]
    }),

    getTicketMessages: builder.query<TicketDTO[], number>({
      query: (ticketId) => ({ url: `/v1/Customer/tickets/messages?ticketId=${ticketId}` }),
      providesTags: (result, error, ticketId) => !error ? [{ type: 'ticket', id: ticketId }, { type: 'ticketMessages', id: ticketId }] : [{ type: 'ticketMessages', id: ticketId }],
      keepUnusedDataFor: 60,
    }),

    replyOnTicket: builder.mutation<void, Pick<TicketDTO, 'message' | 'replyMessage'> & { ticketId: number }>({
      query: (body) => ({
        url: '/v1/Customer/ticket/reply',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
      async onQueryStarted({ ticketId }, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(({ data, meta }) =>
          dispatch(
            // @ts-ignore
            api.util.updateQueryData('getTicketMessages', ticketId, (draft: any) => {
              draft.push(data)
            })
          )
        )
      },
    }),

    closeTicket: builder.mutation<void, number>({
      query: (tiketId) => ({ url: `/v1/Customer/ticket/close/${tiketId}`, method: 'PUT' }),
      invalidatesTags: (result, error, ticketId) => !error ? [{ type: 'ticket', id: ticketId }] : [],
    }),

    assignedToSatff: builder.mutation<void, { assignedToId: number, ticketId: number }>({
      query: (body) => ({ url: '/v1/Customer/ticket/assign', method: 'PUT', body }),
      invalidatesTags: (result, error, { ticketId }) => !error ? [{ type: 'ticket', id: ticketId }] : [],
    }),

  })
})


export const {
  useAddTicketMutation,
  useGetTicketListQuery,
  useGetTicketMessagesQuery,
  useReplyOnTicketMutation,
  useCloseTicketMutation,
  useAssignedToSatffMutation,
} = extendedApi