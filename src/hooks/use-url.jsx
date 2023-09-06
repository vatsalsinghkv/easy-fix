import { createContext, useContext, useEffect, useState } from 'react';

import { request } from '../api/request';
import { DEFAULT_LANGUAGE } from '../utils/config';

export const UrlContext = createContext();

export default function UseUrlProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [page, setPage] = useState(1);
  const url = request.searchIssues(language, page);

  useEffect(() => {
    setPage(1);
  }, [language]);

  const changePage = (no) => {
    no >= 1 && setPage(no);
  };

  return (
    <UrlContext.Provider
      value={{ url, changePage, language, setLanguage, page }}
    >
      {children}
    </UrlContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUrl() {
  return useContext(UrlContext);
}
