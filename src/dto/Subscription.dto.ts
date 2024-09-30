export type SubscriptionPlanDTO = {
  id: number
  name: string
  priceId: string
  duration: number
  amount: number
  currencyId: number
  isAccommodationEnabled: boolean
  isTicketingSystemEnabled: boolean
  isVisaEnabled: boolean
  noOfEvents: number
  noOfStaffs: number
  status: 'active' | 'inactive'
  isPlanActive: boolean
  startDate: string
  endDate: string
}
