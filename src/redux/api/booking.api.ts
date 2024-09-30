import { api } from './api.config'
import { TGuest } from '@/types/Guest.type'
import { BookingDTO } from '@/dto/Booking.dto'
import { CustomerDTO, EventDTO } from '@/dto'
import { Pagination, PaginationApiResponse, PaymentMethods } from '@/types'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addGuest: builder.mutation<void, Partial<TGuest>>({
      query: ({ orderId, ...body }) => {
        const url = orderId ? `/v1/Customer/order/${orderId}/guest` : '/v1/Customer/order/guest'
        return ({ url, method: 'POST', body })
      },
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    updateGuest: builder.mutation<void, Partial<TGuest> & { guestId: number }>({
      query: ({ guestId, orderId, ...body }) => ({ url: `/v1/Customer/order/${orderId}/guest/${guestId}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    deleteGuest: builder.mutation<void, { guestId: number, eventId: number }>({
      query: ({ guestId }) => ({ url: `/v1/Customer/order/guest/${guestId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    addGuestAccommodation: builder.mutation<void, Partial<TGuest>>({
      query: (body) => ({ url: '/v1/Customer/order/accommodation', method: 'POST', body }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    updateGuestAccommodation: builder.mutation<void, Partial<TGuest>>({
      query: (body) => ({ url: '/v1/Customer/order/accommodation', method: 'PUT', body }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    deleteGuestAccommodation: builder.mutation<void, { sequenceNo: number, orderId: number, eventId: number }>({
      query: ({ eventId, ...body }) => ({ url: '/v1/Customer/order/accommodation', method: 'DELETE', body }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    updateGuestVisaPreferences: builder.mutation<void, TVisaPreferences>({
      query: ({ eventId, ...body }) => ({ url: `/v1/Customer/order/visa`, method: 'PUT', body, headers: { hideToast: 'true' } }),
      invalidatesTags: (result, error, { eventId }) => !error ? [{ type: 'booking', eventId }] : [],
    }),

    getBookingDetailsByEvent: builder.query<BookingDTO | null, number>({
      query: (eventId) => `/v1/Customer/order/details/${eventId}`,
      providesTags: (result, error, eventId) => !error ? [{ type: 'booking', eventId }] : []
    }),

    getBookingsList: builder.query<PaginationApiResponse<TBookingList>, Pagination & { eventId?: number | string, orderDate?: string }>({
      query: (params) => ({ url: '/v1/Master/bookings/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'booking' as const, id })), { type: 'booking', id: 'LIST' }] : [{ type: 'booking', id: 'LIST' }]
    }),

    getBooking: builder.query<BookingDTO, number>({
      query: (orderId) => `/v1/Master/booking/${orderId}`,
      providesTags: (result, error, orderId) => !error ? [{ type: 'booking', id: orderId }] : []
    }),

    updateGuestTransportation: builder.mutation<void, Partial<TGuest> & { guestId: number, orderId: number }>({
      query: (body) => ({ url: '/v1/Customer/guest/transportation', method: 'PUT', body }),
      invalidatesTags: (result, error, { orderId }) => !error ? [{ type: 'booking', id: orderId }] : [],
    }),

    getTransportationList: builder.query<PaginationApiResponse<TGuest>, Pagination & { eventId?: number | string, hotelId?: number | string, date?: string, isArrival: boolean }>({
      query: (params) => ({ url: '/v1/Staff/guest/transportation/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ orderId }) => ({ type: 'booking' as const, id: orderId })), { type: 'booking', id: 'LIST' }] : [{ type: 'booking', id: 'LIST' }]
    }),

    getVisaList: builder.query<PaginationApiResponse<TVisa>, Pagination>({
      query: (params) => ({ url: `/v1/Staff/guest/all`, params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ orderId }) => ({ type: 'booking' as const, id: orderId })), { type: 'booking', id: 'LIST' }] : [{ type: 'booking', id: 'LIST' }]
    }),

    updateVisaStatus: builder.mutation<void, { guestId: number, bookingId: number, visaStatus: TGuest['visaStatus'] }>({
      query: ({ guestId, ...body }) => ({ url: `/v1/Staff/guest/${guestId}/visaStatus`, method: 'PUT', body }),
      invalidatesTags: (result, error, { bookingId }) => !error ? [{ type: 'booking', id: bookingId }] : [],
    }),

    getGuestList: builder.query<PaginationApiResponse<{ guest: TGuest, event: EventDTO }>, Pagination & { eventId?: number, status?: string, visaStatus?: string }>({
      query: (params) => ({ url: '/v1/Customer/event/guest/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ guest }) => ({ type: 'booking' as const, id: guest.orderId })), { type: 'booking', id: 'LIST' }] : [{ type: 'booking', id: 'LIST' }]
    }),

    getAvailableGuestList: builder.query<any, { orderId: number, guestId: number }>({
      query: (params) => ({ url: `/v1/Customer/order/guests`, params }),
      providesTags: (result, error) => !error ? [{ type: 'booking', id: 'List' }] : []
    }),

    guestReplace: builder.mutation<any, GuestReplace>({
      query: (body) => ({ url: `/v1/Customer/guest/replace`, method: 'PUT', body, headers: { hideToast: 'true' } }),
      invalidatesTags: (result, error) => !error ? [{ type: 'booking' }] : [],
    }),

    guestCancel: builder.mutation<any, { guestId: number, bookingId: number }>({
      query: ({ guestId }) => ({ url: `/v1/Customer/guest/${guestId}/cancel`, method: 'PUT' }),
      invalidatesTags: (result, error, { bookingId }) => !error ? [{ type: 'booking', id: bookingId }] : [],
    }),

    bookingPayment: builder.mutation<{ redirectUrl: string }, { orderId: number, useWalletBalance: boolean, paymentType: PaymentMethods, successUrl: string, cancelUrl: string }>({
      query: (body) => ({ url: '/v1/Payment/booking', method: 'POST', body, headers: { hideToast: 'true' } }),
    }),

    generateBookingPdf: builder.query<Blob, { bookingId: string }>({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-booking-pdf`,
        params,
        headers: { hideToast: 'true' },
        responseHandler: (response) => response.blob(),
      }),
      providesTags: (result, error, { bookingId }) => !error ? [{ type: 'booking', id: bookingId }] : []
    }),

  })
})


type TVisaPreferences = {
  orderId: number
  visaFeesId: number
  eventId: number
  guestVisaInfos: {
    guestId: number
    visaAssistanceRequired: boolean
    visaOfficialLetterRequired: boolean
  }[]
}


export type TVisa = Omit<TGuest, 'hotel'> & {
  event: Pick<EventDTO, 'id' | 'name'>,
  order: Pick<BookingDTO, 'id' | 'amountPaid' | 'orderDate' | 'paymentStatus' | 'status'>
  customer: CustomerDTO
}


type GuestReplace = {
  orderId: number
  successUrl: string
  cancelUrl: string
  oldGuestId: number
  newGuestId: string | number | undefined
  passportFirstName: string | undefined
  passportLastName: string | undefined
  passportNumber: string | undefined
}


export type TBookingList = BookingDTO & { event: EventDTO }


export const {
  useAddGuestMutation,
  useUpdateGuestMutation,
  useDeleteGuestMutation,
  useGetBookingDetailsByEventQuery,
  useAddGuestAccommodationMutation,
  useUpdateGuestAccommodationMutation,
  useDeleteGuestAccommodationMutation,
  useUpdateGuestVisaPreferencesMutation,
  useGetBookingsListQuery,
  useGetBookingQuery,
  useUpdateGuestTransportationMutation,
  useGetTransportationListQuery,
  useGetVisaListQuery,
  useUpdateVisaStatusMutation,
  useGetGuestListQuery,
  useGetAvailableGuestListQuery,
  useGuestReplaceMutation,
  useGuestCancelMutation,
  useBookingPaymentMutation,
  useLazyGenerateBookingPdfQuery,
} = extendedApi