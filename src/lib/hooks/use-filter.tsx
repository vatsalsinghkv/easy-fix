import { useUrlValues } from '@/lib/hooks/useUrlValues';
import { Label, sortedLabels } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import { FormEvent, createContext, useContext, useState } from 'react';

type FilterContextType = {
  customLabel: string;
  language: Language;
  labelsSelected: Label[];
  ordering: Ordering;
  sortingTag: SortingTag;
  labels: Label[];
  customLabelHandler: (e: FormEvent) => void;
  setCustomLabel: (label: string) => void;
  languageChangeHandler: (payload: Language) => () => void;
  labelsToggleHandler: (payload: Label) => () => void;
  sortingTagClickHandler: (payload: SortingTag) => () => void;
};

const initialState: FilterContextType = {
  customLabel: '',
  language: 'all',
  labelsSelected: ['hacktoberfest'],
  ordering: 'asc',
  sortingTag: 'best-match',
  labels: sortedLabels,
  customLabelHandler: () => {},
  setCustomLabel: () => {},
  languageChangeHandler: () => () => {},
  labelsToggleHandler: () => () => {},
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
    setLabels([...labels, customLabel as Label]);
    labelsToggleHandler(customLabel as Label)();
    setCustomLabel('');
  };

  const { dispatch, language, ordering, sortingTag, labels: labelsSelected } = useUrlValues();

  const languageChangeHandler = (payload: Language) => {
    return () => dispatch({ type: 'update-language', payload });
  };

  const labelsToggleHandler = (payload: Label) => {
    return () => dispatch({ type: 'toggle-label', payload });
  };

  const sortingTagClickHandler = (payload: SortingTag) => {
    return () => dispatch({ type: 'update-sorting-tag', payload });
  };

  return (
    <FilterContext.Provider
      value={{
        customLabel,
        labelsSelected,
        language,
        ordering,
        sortingTag,
        labels,
        customLabelHandler,
        languageChangeHandler,
        labelsToggleHandler,
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
