export interface CustomerDTO {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  countryId: number
  country: string
  status: 'active' | 'inactive'
  createdDate: string
}
