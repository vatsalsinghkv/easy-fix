import { request } from '@/lib/utils';
import { useEffect, useState } from 'react';

function useFetch<T = unknown>(url: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = (await request(url)) as T;
        setData(data);
        setLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
        setError(new Error('Something went wrong during request call'));
        setLoading(false);
      }
    })();

    return () => {
      setLoading(true);
      setError(null);
    };
  }, [url]);

  return { loading, error, data };
}

export default useFetch;
