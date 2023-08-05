import { useContext } from 'react';

import { UrlContext } from '../context/UrlContext';

export default function useUrl() {
  return useContext(UrlContext);
}
