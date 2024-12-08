import { useState, useEffect } from 'react';

export const useLocalStorageState = <T extends { toString(): string }>(
  name: string,
  initialValue: T,
) => {
  if (typeof window !== 'undefined') {
    const [current, setCurrent] = useState<T>(
      (localStorage.getItem(name) as T) || initialValue,
    );

    useEffect(() => {
      localStorage.setItem(name, current.toString());
    }, [current]);
    return { current, setCurrent };
  }

  return { current: initialValue as T, setCurrent: () => {} };
};
