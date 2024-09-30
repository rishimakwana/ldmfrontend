export interface OrganizationDTO {
  id: number
  organizationName: string
  logo: string
  bannerImage?: string
  website?: string
  email: string
  phone: string
  domainName?: string
  theme: Theme
  status: 'pending' | 'active' | 'inactive'
  currencyId?: number
  displayCurrencyId?: number
  displayCurrencyRate?: number
  bannerHeading?: string
  bannerSubHeading?: string
}


type Theme = {
  color: {
    primary: string
    secondary?: string
    accent?: string
  }
}