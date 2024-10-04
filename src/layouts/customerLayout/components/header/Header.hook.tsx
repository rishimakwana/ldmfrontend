import { MenuOption } from '@/types'


export const useTabOptions = () => {

  const TAB: (Required<Pick<MenuOption, 'link'>> & MenuOption)[] = [
    // { id: 6, label: 'Dashboard', link: '/customer/dashboard' },
    { id: 12, label: 'Bookings', link: '/customer/my-bookings' },
    { id: 19, label: 'Wallet', link: '/customer/my-wallet' },
    { id: 15, label: 'Profile', link: '/customer/my-profile' },
    { id: 14, label: 'Password', link: '/customer/change-password' },
  ]

  return TAB
}