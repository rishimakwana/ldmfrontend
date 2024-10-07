import { IconType } from "react-icons";
import { IoMdContact ,IoMdDocument} from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";


export type CardData = {
  id : any
  label: string;
  numbers :string
  color : any
  Icon?: IconType;
} & (
    | { link?: never; children: Omit<CardData, 'Icon'>[]; target?: never }
    | { link: string; children?: never; target?: '_blank' | '_self' }
  );

export const CARD_OPTIONS: CardData[] = [
  { id: 6, label: 'Client', numbers : "1234",  link: '/lawyer/dashboard/onboard-client',color : 'primary.light', Icon: IoMdContact },
  { id: 1, label: 'Documents',numbers : "234", link: '/dashboard/organizations', color : 'secondary.light', Icon: IoMdDocument },
  { id: 5, label: 'Subscriptions', numbers : "134",link: '/dashboard/subscriptions', color :'warning.light', Icon: MdPersonAddAlt1 },
];