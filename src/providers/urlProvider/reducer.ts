import { DEFAULT_LABELS, DEFAULT_LANGUAGE, DEFAULT_ORDERING, DEFAULT_PAGE, DEFAULT_SORTING_TAG } from '@/lib/utils/config';
import { composeUrl } from '@/lib/utils/helper';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import { Reducer } from 'react';


export type State = {
  language: Language;
  ordering: Ordering;
  page: number;
  sortingTag: SortingTag;
  url: string;
  labels: string[];
};

type UpdateLanguageAction = {
  type: 'update-language';
  payload: Language;
};

type UpdateSortingTagAction = {
  type: 'update-sorting-tag';
  payload: SortingTag;
};

type UpdatePageAction = {
  type: 'update-page';
  payload: number;
};

type UpdateLabelsAction = {
  type: 'update-labels';
  payload: string[];
};

export type Action =
  | UpdateLanguageAction
  | UpdateSortingTagAction
  | UpdatePageAction | UpdateLabelsAction;

export const defaultState: State = {
  language: DEFAULT_LANGUAGE,
  ordering: DEFAULT_ORDERING,
  page: DEFAULT_PAGE,
  sortingTag: DEFAULT_SORTING_TAG,
  url: composeUrl(
    DEFAULT_LANGUAGE,
    DEFAULT_PAGE,
    DEFAULT_SORTING_TAG,
    DEFAULT_ORDERING
  ),
  labels: DEFAULT_LABELS,
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
    case 'update-labels':
      const labels = action.payload;

      return {
        ...state,
        labels,
        page: 1,
        url: composeUrl(state.language, state.page, state.sortingTag, state.ordering, labels),
      };
    case 'update-language':
      const language = action.payload;

      return {
        ...state,
        language,
        page: 1,
        url: composeUrl(language, state.page, state.sortingTag, state.ordering, state.labels),
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
        url: composeUrl(state.language, state.page, sortingTag, ordering, state.labels),
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
        url: composeUrl(state.language, page, state.sortingTag, state.ordering, state.labels),
      };

    default:
      return state;
  }
};

export default reducer;