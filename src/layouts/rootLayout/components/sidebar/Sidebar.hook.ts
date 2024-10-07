
import { MdOutlineCloudUpload, MdDashboardCustomize, MdPersonAddAlt } from 'react-icons/md'
import { IoLogOutOutline } from "react-icons/io5";

import { MenuOption } from '@/types'

export const useSidebarOptions = () => {

  const SIDEBAR_OPTIONS: MenuOption[] = [
    { id: 1, label: 'Onboard-Client', link: '/lawyer/dashboard/', Icon: MdDashboardCustomize },
    { id: 2, label: 'Upload Document', link: '/lawyer/dashboard/upload-document', Icon: MdOutlineCloudUpload },
    { id: 3, label: 'Client List', link: '/lawyer/dashboard/client-list', Icon: MdPersonAddAlt },
    { id: 4, label: 'Sign Out', link: '/dashboard/staff', Icon: IoLogOutOutline },

  ]

  return SIDEBAR_OPTIONS
}