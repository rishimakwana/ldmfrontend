import { PaymentMethods } from '@/types'
import { HotelDTO } from './Hotel.dto'
import { AccessibilityDTO } from './Accessibility.dto'



export type EventDTO = {
  id: number
  name: string
  bannerImage: string
  status: 'draft' | 'active' | 'inactive'
  description: string
  address: string
  city: string
  state: string
  country?: string
  countryId: number
  startDate: string
  endDate: string
  timeZoneId: number
  accommodationInfoFile?: string
  transportationInfoFile?: string
  accessibilityInfo: number[]
  accessibilityInfoData: AccessibilityDTO[]
  accommodationPackageInfo: string[]
  roleWiseData: Roles[]
  paymentMethodSupported: Payment[]
  paymentproviderId?: number
  penalties: Penalty[]
  hotels: HotelDTO[]
}


type Roles = {
  role: string
  price: number
  currencyId: number
  access?: string[]
  code?: string
}

type Payment = {
  type: PaymentMethods
  label: string
  value: boolean
  data?: string
}

type Penalty = {
  penaltyType: number
  deadline: string
  fees: number
  currencyId: number
  isPercentage: boolean
}