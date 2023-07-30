import { createContext, useEffect, useState } from 'react';
import { request } from '../api/request';

export const UrlContext = createContext();

export default function UseUrlProvider({ children }) {
  const {
    url: baseUrl,
    parameters: { page: urlPage },
  } = request.searchIssues;

  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(baseUrl);

  useEffect(() => {
    setUrl(`${baseUrl}${urlPage(page)}`);
  }, [page, baseUrl, urlPage]);

  const changePage = (no) => {
    no >= 1 && setPage(no);
  };

  return (
    <UrlContext.Provider value={{ url, changePage }}>
      {children}
    </UrlContext.Provider>
  );
}
