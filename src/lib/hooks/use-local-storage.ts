import { useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (val: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  });

  const setValue = (val: T | ((val: T) => T)) => {
    const value = val instanceof Function ? val(storedValue) : val;
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue];
}
