import { composeUrl } from '@/lib/utils';
import {
  DEFAULT_LABEL,
  DEFAULT_LANGUAGE,
  DEFAULT_ORDERING,
  DEFAULT_PAGE,
  DEFAULT_SORTING_TAG,
} from '@/lib/utils/config';
import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import { Reducer } from 'react';

export type State = {
  language: Language;
  ordering: Ordering;
  page: number;
  sortingTag: SortingTag;
  label: Label;
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

type UpdateLabel = {
  type: 'update-label';
  payload: Label;
};

type UpdatePageAction = {
  type: 'update-page';
  payload: number;
};

export type Action =
  | UpdateLanguageAction
  | UpdateSortingTagAction
  | UpdatePageAction
  | UpdateLabel;

export const defaultState: State = {
  language: DEFAULT_LANGUAGE,
  ordering: DEFAULT_ORDERING,
  page: DEFAULT_PAGE,
  sortingTag: DEFAULT_SORTING_TAG,
  label: DEFAULT_LABEL,
  url: composeUrl(
    DEFAULT_LANGUAGE,
    DEFAULT_PAGE,
    DEFAULT_SORTING_TAG,
    DEFAULT_ORDERING,
    DEFAULT_LABEL
  ),
} as const;

const toggleOrdering = (
  currentSortingTag: SortingTag,
  newSortingTg: SortingTag,
  currentOrdering: Ordering
): Ordering => {
  if (currentSortingTag !== newSortingTg) return DEFAULT_ORDERING;
  if (currentOrdering === 'asc') return 'desc';
  return 'asc';
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'update-language':
      const language = action.payload;

      return {
        ...state,
        language,
        page: 1,
        url: composeUrl(
          language,
          state.page,
          state.sortingTag,
          state.ordering,
          state.label
        ),
      };

    case 'update-label':
      const label = action.payload;

      return {
        ...state,
        label,
        page: 1,
        url: composeUrl(
          state.language,
          state.page,
          state.sortingTag,
          state.ordering,
          label
        ),
      };

    case 'update-sorting-tag':
      const sortingTag = action.payload;
      const ordering = toggleOrdering(
        state.sortingTag,
        action.payload,
        state.ordering
      );

      return {
        ...state,
        ordering,
        sortingTag,
        url: composeUrl(
          state.language,
          state.page,
          sortingTag,
          ordering,
          state.label
        ),
      };

    case 'update-page':
      const page = action.payload;

      if (page < 1) {
        console.warn("Invalid 'update-page' action value: " + page);
        return state;
      }

      return {
        ...state,
        page,
        url: composeUrl(
          state.language,
          page,
          state.sortingTag,
          state.ordering,
          state.label
        ),
      };

    default:
      return state;
  }
};

export default reducer;
