import { createContext, useContext, useEffect, useState } from 'react';

import { request } from '@/lib/api/request';
import { DEFAULT_LANGUAGE, DEFAULT_SORT_TAG } from '@/lib/utils/config';

export const UrlContext = createContext();

export default function UseUrlProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [sort, setSort] = useState(DEFAULT_SORT_TAG);

  const [page, setPage] = useState(1);
  const url = request.searchIssues(language, page, sort);

  useEffect(() => {
    setPage(1);
  }, [language]);

  const changePage = (no) => {
    no >= 1 && setPage(no);
  };

  return (
    <UrlContext.Provider
      value={{ url, changePage, language, setLanguage, page, sort, setSort }}
    >
      {children}
    </UrlContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUrl() {
  return useContext(UrlContext);
}
