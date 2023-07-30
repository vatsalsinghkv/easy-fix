import { useEffect, useState } from 'react';
import { FETCH } from '../utils/helper';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      FETCH(url).then((data) => {
        setData(data);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
