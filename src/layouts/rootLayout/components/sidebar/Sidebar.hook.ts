import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { RiListUnordered } from 'react-icons/ri'
import { PiIdentificationBadge } from 'react-icons/pi'
import { MdOutlineSettings, MdOutlineEventAvailable, MdSupportAgent, MdOutlineConfirmationNumber, MdOutlineDashboard, MdOutlineGroups, MdCorporateFare, MdOutlineCommute, MdOutlineBadge, MdOutlinePeopleAlt } from 'react-icons/md'

import { MenuOption } from '@/types'
import { useReduxSelector } from '@/hooks'



export const useSidebarOptions = () => {
  const { isAccommodationEnabled, isVisaEnabled, isTicketingSystemEnabled } = useReduxSelector(state => state.subscription.plan)

  const SIDEBAR_OPTIONS: MenuOption[] = [
    { id: 6, label: 'Dashboard', link: '/dashboard/home', Icon: MdOutlineDashboard },
    { id: 1, label: 'Organizations', link: '/dashboard/organizations', Icon: MdCorporateFare },
    { id: 5, label: 'Subscriptions', link: '/dashboard/subscriptions', Icon: RiListUnordered },
    { id: 2, label: 'Staff', link: '/dashboard/staff', Icon: MdOutlineGroups },
    { id: 17, label: 'Customers', link: '/dashboard/customers', Icon: MdOutlinePeopleAlt },
    { id: 3, label: 'Events', link: '/dashboard/events', Icon: MdOutlineConfirmationNumber },
    { id: 12, label: 'Bookings', link: '/dashboard/bookings', Icon: MdOutlineEventAvailable },
    ...(isAccommodationEnabled ? [{ id: 4, label: 'Hotels', link: '/dashboard/hotel', Icon: HiOutlineBuildingOffice }] : []),
    { id: 10, label: 'Accreditation', link: '/dashboard/accreditation', Icon: MdOutlineBadge },
    { label: 'Accreditation Request', link: '/dashboard/accreditation-request', Icon: MdOutlineBadge, roles: ['superAdmin'] },
    ...(isVisaEnabled ? [{ id: 8, label: 'Visa', link: '/dashboard/visa', Icon: PiIdentificationBadge }] : []),
    { id: 9, label: 'Transportation', link: '/dashboard/transportation', Icon: MdOutlineCommute },
    ...(isTicketingSystemEnabled ? [{ id: 18, label: 'Support Tickets', link: '/dashboard/tickets', Icon: MdSupportAgent }] : []),
    { id: 11, label: 'Settings', link: '/dashboard/settings', Icon: MdOutlineSettings },
  ]

  return SIDEBAR_OPTIONS
}