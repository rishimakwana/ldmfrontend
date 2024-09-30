import { TGuest } from '@/types/Guest.type'
import { EventDTO } from './Event.dto'
import { HotelDTO } from './Hotel.dto'
import { ProfileDTO } from './Profile.dto'



export type BookingDTO = {
  id: number
  userId: number
  totalAmountInDefaultCurrency: number
  totalAmountInDisplayCurrency: number
  amountPaid: number
  guestDetails: TGuest[]
  orderDate: string | null
  eventId: number
  accommodationInfo: AccommodationInfo[]
  orderDetails: orderDetails[]
  user?: ProfileDTO
  createdDate: string
  updatedDate: string | null
  currencyCode: string
  status: 'pending' | 'active' | 'inactive' | 'deleted' | 'draft' | 'cancelled' | 'booked'
  paymentStatus: 'unpaid' | 'paid' | 'partiallyPaid' | 'failed'
  isVisaEnabled: boolean
  isAccommodationEnabled: boolean
  paidAmount: number
  unpaidAmount: number
}


type orderDetails = {
  id: number
  type: 'accommodation' | 'registration' | 'visa'
  amount: number
  orderId: number
}


type AccommodationInfo = {
  amount: number
  guestIds: number[]
  guestNames: string[]
  fromDate: string
  toDate: string
  hotelId: number
  hotelRoomTypeId: number
  numberOfNights: number
  orderDetailId: 24
  orderId: 22
  sequenceNo: number
  hotel: Omit<HotelDTO, 'roomType'> & {
    roomType: HotelDTO['roomType'][0]
  }
}