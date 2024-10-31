import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (val: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);

    if (value === 'true' || value === 'false') {
      return JSON.parse(value) as T;
    }

    return value ? (value as T) : initialValue;
  });

  useEffect(() => {
    if (typeof storedValue === 'boolean') {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } else {
      window.localStorage.setItem(key, storedValue as string);
    }
  }, [storedValue, key]);

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setStoredValue, removeValue] as const;
}
