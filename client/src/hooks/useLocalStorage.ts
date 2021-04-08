import { useState, useEffect } from "react";

function getSaveKey(key: string, initialValue: any) {
  if (key === null || key === undefined) return;
  const savedValue = JSON.parse(localStorage.getItem(key)!);

  if (savedValue) {
    return savedValue;
  }

  if (typeof initialValue === "function") {
    return initialValue();
  }

  return initialValue;
}

/**
 * A hook to save and retrieve a localStorage key value pair.
 * @param key           A string to name the storage object
 * @param initialValue  Initial value of the stored object
 * @returns             [value, setValueFunction] based on useState hook.
 */
export default function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    return getSaveKey(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
