import { useUrlValues } from '@/lib/hooks/useUrlValues';
import { Label, sortedLabels } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import { FormEvent, createContext, useContext, useState } from 'react';

type FilterContextType = {
  customLabel: string;
  language: Language;
  label: string;
  ordering: Ordering;
  sortingTag: SortingTag;
  labels: Label[];
  customLabelHandler: (e: FormEvent) => void;
  setCustomLabel: (label: string) => void;
  languageChangeHandler: (payload: Language) => () => void;
  labelsChangeHandler: (payload: Label) => () => void;
  sortingTagClickHandler: (payload: SortingTag) => () => void;
};

const initialState: FilterContextType = {
  customLabel: '',
  language: 'all',
  label: 'hacktoberfest',
  ordering: 'asc',
  sortingTag: 'best-match',
  labels: sortedLabels,
  customLabelHandler: () => {},
  setCustomLabel: () => {},
  languageChangeHandler: () => () => {},
  labelsChangeHandler: () => () => {},
  sortingTagClickHandler: () => () => {},
};

const FilterContext = createContext<FilterContextType>(initialState);

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customLabel, setCustomLabel] = useState<string>('');
  const [labels, setLabels] = useState<Label[]>(sortedLabels);

  const customLabelHandler = (e: FormEvent) => {
    e.preventDefault();
    setLabels([...labels, customLabel]);
    labelsChangeHandler(customLabel as Label)();
    setCustomLabel('');
  };

  const { dispatch, language, ordering, sortingTag, label } = useUrlValues();

  const languageChangeHandler = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const labelsChangeHandler = (payload: Label) => {
    return () => dispatch({ type: 'update-label', payload });
  };

  const sortingTagClickHandler = (payload: SortingTag) => {
    return () => dispatch({ type: 'update-sorting-tag', payload });
  };

  return (
    <FilterContext.Provider
      value={{
        customLabel,
        label,
        language,
        ordering,
        sortingTag,
        labels,
        customLabelHandler,
        languageChangeHandler,
        labelsChangeHandler,
        sortingTagClickHandler,
        setCustomLabel,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
