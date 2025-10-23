import useLocalStorage from '@/lib/hooks/use-local-storage';
import { composeUrl } from '@/lib/utils';
import {
  DEFAULT_LABEL,
  DEFAULT_LANGUAGE,
  DEFAULT_ORDERING,
  DEFAULT_PAGE,
  DEFAULT_SORTING_TAG,
  DEFAULT_ISSUES_PER_PAGE,
} from '@/lib/utils/config';
import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { Action, State, toggleOrdering } from './types';

type UrlContextValue = {
  dispatch: Dispatch<Action>;
  language: Language;
  ordering: Ordering;
  page: number;
  sortingTag: SortingTag;
  labels: Label[];
  itemsPerPage: number;
  url: string;
};

const UrlContext = createContext<UrlContextValue | undefined>(undefined);

export const UrlProvider = ({ children }: PropsWithChildren) => {
  const [initLanguage, setLanguage] = useLocalStorage<Language>('language', DEFAULT_LANGUAGE);
  const [initOrdering, setOrdering] = useLocalStorage<Ordering>(
    'order',
    DEFAULT_ORDERING
  );
  const [initSortingTag, setSortingTag] = useLocalStorage<SortingTag>(
    'sortingTag',
    DEFAULT_SORTING_TAG
  );
  const [initLabelsStr, setLabelsStr] = useLocalStorage<string>(
    'labels',
    JSON.stringify([])
  );
  const parseLabels = (val: string): Label[] => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? (parsed as Label[]) : [DEFAULT_LABEL];
    } catch {
      return [DEFAULT_LABEL];
    }
  };
  const initLabels = parseLabels(initLabelsStr);
  const [initItemsPerPage, setItemsPerPage] = useLocalStorage<number>(
    'itemsPerPage',
    DEFAULT_ISSUES_PER_PAGE
  );

  const defaultState: State = {
    language: initLanguage,
    ordering: initOrdering,
    page: DEFAULT_PAGE,
    sortingTag: initSortingTag,
    labels: initLabels,
    itemsPerPage: initItemsPerPage,
    url: composeUrl(
      [initLanguage],
      DEFAULT_PAGE,
      initSortingTag,
      initOrdering,
      initLabels,
      initItemsPerPage
    ),
  } as const;

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case 'update-language':
        const language = action.payload;
        setLanguage(language);

        return {
          ...state,
          language,
          page: 1,
          url: composeUrl(
            [language],
            1,
            state.sortingTag,
            state.ordering,
            state.labels,
            state.itemsPerPage
          ),
        };

      case 'toggle-label':
        const toggled = action.payload;
        let nextLabels: Label[];
        if (toggled === 'none') {
          nextLabels = ['none'] as Label[];
        } else {
          const withoutNone = state.labels.filter((l) => l !== 'none');
          nextLabels = withoutNone.includes(toggled)
            ? withoutNone.filter((l) => l !== toggled)
            : [...withoutNone, toggled];
        }
        setLabelsStr(JSON.stringify(nextLabels));

        return {
          ...state,
          labels: nextLabels,
          page: 1,
          url: composeUrl(
            [state.language],
            1,
            state.sortingTag,
            state.ordering,
            nextLabels,
            state.itemsPerPage
          ),
        };

      case 'update-sorting-tag':
        const sortingTag = action.payload;
        const ordering = toggleOrdering(
          state.sortingTag,
          action.payload,
          state.ordering
        );

        setSortingTag(sortingTag);
        setOrdering(ordering);

        return {
          ...state,
          ordering,
          sortingTag,
          url: composeUrl(
            [state.language],
            state.page,
            sortingTag,
            ordering,
            state.labels,
            state.itemsPerPage
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
            [state.language],
            page,
            state.sortingTag,
            state.ordering,
            state.labels,
            state.itemsPerPage
          ),
        };

      case 'update-items-per-page':
        const itemsPerPage = action.payload;
        setItemsPerPage(itemsPerPage);

        return {
          ...state,
          itemsPerPage,
          page: 1, // Reset to first page when changing items per page
          url: composeUrl(
            [state.language],
            1,
            state.sortingTag,
            state.ordering,
            state.labels,
            itemsPerPage
          ),
        };

      default:
        return state;
    }
  };

  const [{ language, ordering, page, sortingTag, url, labels, itemsPerPage }, dispatch] =
    useReducer<Reducer<State, Action>>(reducer, defaultState);

  const value = useMemo(
    () => ({
      dispatch,
      language,
      ordering,
      page,
      sortingTag,
      url,
      labels,
      itemsPerPage,
    }),
    [dispatch, language, ordering, page, sortingTag, labels, url, itemsPerPage]
  );
  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export default UrlProvider;

export const useUrlValues = (): UrlContextValue => {
  const context = useContext(UrlContext);

  if (!context) {
    throw new Error('useUrlValues must be used within UrlProvider');
  }

  return context;
};
