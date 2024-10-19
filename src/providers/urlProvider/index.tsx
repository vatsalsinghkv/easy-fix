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

import reducer, { Action, State, defaultState } from './reducer';

type UrlContextValue = {
  dispatch: Dispatch<Action>;
  language: Language;
  ordering: Ordering;
  page: number;
  sortingTag: SortingTag;
  label: Label;
  url: string;
};

const UrlContext = createContext<UrlContextValue | undefined>(undefined);

export const UrlProvider = ({ children }: PropsWithChildren) => {
  const [{ language, ordering, page, sortingTag, url, label }, dispatch] =
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
    }),
    [dispatch, language, ordering, page, sortingTag, label, url]
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
