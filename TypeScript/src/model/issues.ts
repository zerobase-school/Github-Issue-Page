import { BadgeProps } from '../components/Badge';

export interface DataItem {
  login: string;
  title: string;
  description: string;
  name: string;
}

export interface Data {
  data: DataItem[];
}

export type List = Partial<DataItem> & { name : string};

const STATE = {
  OPEN: 'open',
  CLOSE: 'close',
} as const;

type STATE = typeof STATE[keyof typeof STATE];

export interface ListItem {
  id: string;
  labels?: BadgeProps[];
  state: STATE;
  created_at: string;
  closed_at: string;
  title: string;
  number: number;
  user: { login : string }
}
