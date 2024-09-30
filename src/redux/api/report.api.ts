import { BookingDTO } from '@/dto/Booking.dto'
import { api } from './api.config'



export type TAdminStatisticsSummary = Record<'totalBookings' | 'totalCountries' | 'totalGuests' | 'totalRegistrations' | 'totalRevenue', number>
export type TSuperAdminStatisticsSummary = Record<'totalCustomers' | 'totalEvents' | 'totalOrganizations' | 'totalRevenue', number>
export type TSuperAdminPaymentSummary = Record<'all' | 'completed' | 'pending', { totalAmount: number, totalOrders: number }>

export type TPieChart = { percentage: number, status: BookingDTO['status'], total: number }
export type TBarGraph = { value: number, label: string }


export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getAdminStatisticsSummary: builder.query<TAdminStatisticsSummary, { eventId?: number | string }>({
      query: (params) => ({ url: '/v1/Reports/admin/statistics/summary', params }),
    }),

    getAdminBookingPieChart: builder.query<TPieChart[], { eventId?: number | string, year: number | string, month?: number | string }>({
      query: (params) => ({ url: '/v1/Reports/admin/booking/pie-chart', params })
    }),

    getAdminBookingBarGraph: builder.query<TBarGraph[], { eventId?: number | string, year: number | string, month?: number | string }>({
      query: (params) => ({ url: '/v1/Reports/admin/booking/bar-graph', params })
    }),

    getAdminPaymentSummary: builder.query<TSuperAdminPaymentSummary, { eventId?: number | string, year: number | string, month?: number | string, date?: string }>({
      query: (params) => ({ url: '/v1/Reports/admin/payment/summary', params })
    }),

    getSuperadminStatisticsSummary: builder.query<TSuperAdminStatisticsSummary, { organizationId?: number | string }>({
      query: (params) => ({ url: '/v1/Reports/superadmin/statistics/summary', params })
    }),

    getSuperadminRevenueBarGraph: builder.query<TBarGraph[], { organizationId?: number | string, year: number | string, month?: number | string }>({
      query: (params) => ({ url: '/v1/Reports/superadmin/booking/revenue-bar-graph', params })
    }),

  })
})


export const {
  useGetAdminBookingBarGraphQuery,
  useGetAdminBookingPieChartQuery,
  useGetAdminStatisticsSummaryQuery,
  useGetAdminPaymentSummaryQuery,
  useGetSuperadminRevenueBarGraphQuery,
  useGetSuperadminStatisticsSummaryQuery,
} = extendedApi