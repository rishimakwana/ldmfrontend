import { HotelDTO } from '@/dto'
import { AccessibilityDTO } from '@/dto/Accessibility.dto'



export type TGuest = {
  id: number
  photo?: string
  orderId: number
  eventId: number
  passportFirstName: string
  passportLastName: string
  passportNumber: string
  role: string
  fromDate?: string
  toDate?: string
  visaAssistanceRequired: boolean | null
  visaOfficialLetterRequired: boolean | null
  registrationFee: number
  hotel?: Omit<HotelDTO, 'roomType'> & {
    roomType: HotelDTO['roomType'][0]
  }
  hotelId?: number
  hotelRoomTypeId?: number
  occupation?: string
  nationality?: string
  jobTitle?: string
  workPlace?: string
  departureFlightAirport?: string
  departureFlightNumber?: string
  departureDateTime: string | null
  departureNotes?: string
  arrivalFlightAirport?: string
  arrivalFlightNumber?: string
  arrivalDateTime: string | null
  arrivalNotes?: string
  dob: string | null
  passportIssueDate: string | null
  passportExpiryDate: string | null
  status: 'incomplete' | 'completed' | 'cancelled'
  visaStatus: 'notApplied' | 'pending' | 'rejected' | 'issued'
  accessibilityInfo: number[]
  accessibilityInfoData: AccessibilityDTO[]
  sequenceNo: number
  visaDocument: string
}