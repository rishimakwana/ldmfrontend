export type HotelDTO = {
  id: number
  name: string
  rating: number
  address: string
  postalCode: string
  city: string
  state: string
  countryId: number
  country: string
  locationLatLong?: string
  eventIds: number[]
  roomType: RoomType[]
}


type RoomType = {
  id: number
  hotelId: number
  roomSize: string
  packagePrice: number
  availability: number
  nightPrice: number
  currencyId: number
  minimumOccupancy: number
  maximumOccupancy: number
  status: 'active' | 'inactive'
} 