import { DEFAULT_ORDERING } from '@/lib/utils/config';
import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';

export type State = {
  language: Language;
  ordering: Ordering;
  page: number;
  sortingTag: SortingTag;
  labels: Label[];
  itemsPerPage: number;
  url: string;
};

type UpdateLanguageAction = {
  type: 'update-language';
  payload: Language;
};

type UpdateSortingTagAction = {
  type: 'update-sorting-tag';
  payload: SortingTag;
};

type ToggleLabelAction = {
  type: 'toggle-label';
  payload: Label;
};

type SetLabelsAction = {
  type: 'set-labels';
  payload: Label[];
};

type UpdatePageAction = {
  type: 'update-page';
  payload: number;
};

type UpdateItemsPerPageAction = {
  type: 'update-items-per-page';
  payload: number;
};

export type Action =
  | UpdateLanguageAction
  | UpdateSortingTagAction
  | UpdatePageAction
  | ToggleLabelAction
  | SetLabelsAction
  | UpdateItemsPerPageAction;

export const toggleOrdering = (
  currentSortingTag: SortingTag,
  newSortingTg: SortingTag,
  currentOrdering: Ordering
): Ordering => {
  if (currentSortingTag !== newSortingTg) return DEFAULT_ORDERING;
  if (currentOrdering === 'asc') return 'desc';
  return 'asc';
};
