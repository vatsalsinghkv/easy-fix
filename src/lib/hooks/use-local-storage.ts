import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (val: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, storedValue);
  }, [storedValue]);

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setStoredValue, removeValue];
}
