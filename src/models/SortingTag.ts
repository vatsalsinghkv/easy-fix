import { ObjectValues } from './ObjectValues';

export const sortingTags = {
  BestMatch: 'best-match',
  Comments: 'comments',
  Reactions: 'reactions',
  Updated: 'updated',
} as const;

export const sortingTagLabels: Record<SortingTag | 'unknown', string> = {
  'best-match': 'Best Match',
  comments: 'Comments',
  reactions: 'Reactions',
  unknown: 'Unknown',
  updated: 'Updated',
};

export type SortingTag = ObjectValues<typeof sortingTags>;

export const sortedSortingTags = Object.values(sortingTags).sort((a, b) => {
  return a.localeCompare(b);
});

export const getSortingTagLabel = (tag: SortingTag) => {
  const tagOpt = sortingTagLabels[tag];

  if (!tagOpt) {
    console.warn('Unknown tag found ' + tag);
    return sortingTagLabels.unknown;
  }

  return tagOpt;
};
