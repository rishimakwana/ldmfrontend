import { useMemo } from 'react';
import { MdOutlineCloudUpload, MdDashboardCustomize, MdPersonAddAlt } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { MenuOption } from '@/types';

export const useSidebarOptions = ({ profile }: any) => {
  console.log("*****dgsdr*****", profile)

  const SIDEBAR_OPTIONS = useMemo<MenuOption[]>(() => {
    console.log("**********", profile)
    const signOutOption: MenuOption = { id: 99, label: 'Sign Out', link: '/login', Icon: IoLogOutOutline };

    if (profile?.roleId !== 1) {
      return [
        { id: 1, label: 'Dashboard', link: '/lawyer/dashboard/', Icon: MdDashboardCustomize },
        { id: 2, label: 'My Documents', link: '/lawyer/dashboard/my-documents', Icon: MdOutlineCloudUpload },
        { id: 3, label: 'Subscription', link: '/lawyer/dashboard/subscription', Icon: MdPersonAddAlt },
        { id: 4, label: 'Billing', link: '/lawyer/dashboard/billing', Icon: MdPersonAddAlt },
        signOutOption,
      ];
    } else {
      return [
        { id: 1, label: 'Onboard-Client', link: '/lawyer/dashboard/', Icon: MdDashboardCustomize },
        { id: 2, label: 'Upload Document', link: '/lawyer/dashboard/upload-document', Icon: MdOutlineCloudUpload },
        { id: 3, label: 'Client List', link: '/lawyer/dashboard/client-list', Icon: MdPersonAddAlt },
        signOutOption,
      ];
    }
  }, [profile?.roleId]);

  return SIDEBAR_OPTIONS;
};
