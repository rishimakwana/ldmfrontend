import { IconType } from "react-icons";

export type CardData = {
  id: any
  label: string;
  numbers: string
  color: any
  Icon?: IconType;
} & (
    | { link?: never; children: Omit<CardData, 'Icon'>[]; target?: never }
    | { link: string; children?: never; target?: '_blank' | '_self' }
  );

export type DataCardProps = {
  cardOptions: CardData[];
};