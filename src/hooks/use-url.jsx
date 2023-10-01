import { DEFAULT_LANGUAGE, DEFAULT_SORT_BY } from '../utils/config';
import { createContext, useContext, useEffect, useState } from 'react';

import { request } from '../api/request';

export const UrlContext = createContext();

export default function UseUrlProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [sort, setSort] = useState(DEFAULT_SORT_TAG);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const url = request.searchIssues(language, page, sortBy);

  useEffect(() => {
    setPage(1);
  }, [language, sortBy]);

  const changePage = (no) => {
    no >= 1 && setPage(no);
  };

  return (
    <UrlContext.Provider
      value={{
        url,
        changePage,
        language,
        setLanguage,
        page,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUrl() {
  return useContext(UrlContext);
}
