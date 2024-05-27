import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log(`Initial load: key=${key}, item=${item}`);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving localStorage key', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      console.log(`Set value: key=${key}, value=${JSON.stringify(valueToStore)}`);
    } catch (error) {
      console.error('Error setting localStorage key', error);
    }
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      console.log(`Effect update: key=${key}, storedValue=${JSON.stringify(storedValue)}`);
    } catch (error) {
      console.error('Error updating localStorage key', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;
