import { useState, useEffect } from "react";

interface LocalStorageInterface {
  key: string;
  initialValue: any;
}

function getSaveKey(savedData: LocalStorageInterface) {
  const savedValue = JSON.parse(localStorage.getItem(savedData.key) || "{}");

  if (savedValue) {
    return savedValue;
  }

  if (typeof savedData.initialValue === "function") {
    return savedData.initialValue();
  }

  return savedData.initialValue;
}

export default function useLocalStorage(data: LocalStorageInterface) {
  const [value, setValue] = useState(() => {
    return getSaveKey(data);
  });

  useEffect(() => {
    localStorage.setItem(data.key, JSON.stringify(value));
  }, [data.key, value]);

  return [value, setValue];
}
