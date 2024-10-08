import { CardData } from "@/components/datacard/DataCard.type";
import { IoIosTime, IoMdContact, IoMdDocument } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdPersonAddAlt1 } from "react-icons/md";


export const LawyerCardOptions: CardData[] = [
  { id: 6, label: 'Client', numbers: "1234", link: '/lawyer/dashboard/onboard-client', color: 'primary.light', Icon: IoMdContact },
  { id: 1, label: 'Documents', numbers: "234", link: '/lawyer/dashboard/organizations', color: 'secondary.light', Icon: IoMdDocument },
  { id: 5, label: 'Subscriptions', numbers: "134", link: '/lawyer/dashboard/subscriptions', color: 'warning.light', Icon: MdPersonAddAlt1 },
];

export const ClientCardOptions: CardData[] = [
  { id: 6, label: 'My Documents', numbers: "1234", link: '/client/dashboard', color: 'primary.light', Icon: IoDocumentText },
  { id: 1, label: 'Recently Shared', numbers: "234", link: '/client/dashboard/organizations', color: 'secondary.light', Icon: IoMdDocument },
  { id: 5, label: 'My Subscription', numbers: "134", link: '/client/dashboard/subscriptions', color: 'warning.light', Icon: IoIosTime },
];

