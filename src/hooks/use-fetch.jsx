import { useEffect, useState } from 'react';

import { FETCH } from '@/utils/helper';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await FETCH(url);
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();

    return () => {
      setLoading(true);
      setError(null);
    };
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
