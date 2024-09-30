import { Roles } from '@/types'
import { OrganizationDTO } from './Organization.dto'



export type ProfileDTO = {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  country: string | null
  countryId: number | null
  fcmToken: string
} & (
    {
      role: Exclude<Roles, 'admin' | 'customer'>
    }
    |
    (
      {
        role: 'admin'
        organizationStatus: OrganizationDTO['status'],
        isSubscribed: boolean
      }
      &
      Omit<OrganizationDTO, 'id' | 'status'>
    )
    |
    {
      role: 'customer'
      customerOrganization: {
        id: number
        type: string
        name: string
      }
    }
  )