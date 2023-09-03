import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key);

  let localStorageData: T;
  if (storedValue === null) {
    localStorageData = defaultValue;
  } else if (typeof defaultValue === "number") {
    localStorageData = parseInt(storedValue, 10) as T;
  } else if (typeof defaultValue === "boolean") {
    localStorageData = (storedValue === "true") as T;
  } else if (typeof defaultValue === "object" || Array.isArray(defaultValue)) {
    try {
      localStorageData = JSON.parse(storedValue) as T;
    } catch (error) {
      console.error("Failed to parse stored JSON:", error);
      localStorageData = defaultValue;
    }
  } else {
    localStorageData = storedValue as T;
  }

  const [state, setState] = useState<T>(localStorageData);

  useEffect(() => {
    if (typeof state === "object" || Array.isArray(state)) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      localStorage.setItem(key, String(state));
    }
  }, [key, state]);

  return [state, setState] as const;
}
