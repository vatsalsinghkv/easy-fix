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
  label: Label;
  itemsPerPage: number;
  url: string;
};

const UrlContext = createContext<UrlContextValue | undefined>(undefined);

export const UrlProvider = ({ children }: PropsWithChildren) => {
  const [initLanguage, setLanguage] = useLocalStorage<Language>(
    'language',
    DEFAULT_LANGUAGE
  );
  const [initOrdering, setOrdering] = useLocalStorage<Ordering>(
    'order',
    DEFAULT_ORDERING
  );
  const [initSortingTag, setSortingTag] = useLocalStorage<SortingTag>(
    'sortingTag',
    DEFAULT_SORTING_TAG
  );
  const [initLabel, setLabel] = useLocalStorage<Label>('label', DEFAULT_LABEL);
  const [initItemsPerPage, setItemsPerPage] = useLocalStorage<number>(
    'itemsPerPage',
    DEFAULT_ISSUES_PER_PAGE
  );

  const defaultState: State = {
    language: initLanguage,
    ordering: initOrdering,
    page: DEFAULT_PAGE,
    sortingTag: initSortingTag,
    label: initLabel,
    itemsPerPage: initItemsPerPage,
    url: composeUrl(
      initLanguage,
      DEFAULT_PAGE,
      initSortingTag,
      initOrdering,
      initLabel,
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
            language,
            1,
            state.sortingTag,
            state.ordering,
            state.label,
            state.itemsPerPage
          ),
        };

      case 'update-label':
        const label = action.payload;
        setLabel(label);

        return {
          ...state,
          label,
          page: 1,
          url: composeUrl(
            state.language,
            1,
            state.sortingTag,
            state.ordering,
            label,
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
            state.language,
            state.page,
            sortingTag,
            ordering,
            state.label,
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
            state.language,
            page,
            state.sortingTag,
            state.ordering,
            state.label,
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
            state.language,
            1,
            state.sortingTag,
            state.ordering,
            state.label,
            itemsPerPage
          ),
        };

      default:
        return state;
    }
  };

  const [{ language, ordering, page, sortingTag, url, label, itemsPerPage }, dispatch] =
    useReducer<Reducer<State, Action>>(reducer, defaultState);

  const value = useMemo(
    () => ({
      dispatch,
      language,
      ordering,
      page,
      sortingTag,
      url,
      label,
      itemsPerPage,
    }),
    [dispatch, language, ordering, page, sortingTag, label, url, itemsPerPage]
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
