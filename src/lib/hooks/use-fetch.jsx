import { request } from '@/lib/utils';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await request(url);
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
