import { ObjectValues } from './ObjectValues';

export const sortingTags = {
  Comments: 'comments',
  Reactions: 'reactions',
  Updated: 'updated',
  BestMatch: 'best-match',
} as const;

export type SortingTag = ObjectValues<typeof sortingTags>;

export const sortedSortingTags = Object.values(sortingTags).sort((a, b) => {
  return a.localeCompare(b);
});
