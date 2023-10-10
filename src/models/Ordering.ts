import { ObjectValues } from './ObjectValues';

export const ordering = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export type Ordering = ObjectValues<typeof ordering>;

export const sortedOrdering = Object.values(ordering).sort((a, b) => {
  return a.localeCompare(b);
});
