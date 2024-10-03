import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useParamsState = (initialParams: { [key: string]: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [current, setCurrent] = useState(initialParams);

  // update state from url change
  useEffect(() => {
    // start out with initialParams
    const newParams = { ...initialParams };
    const currentParams = new URLSearchParams(searchParams);

    // update with what is in url
    for (const [key, value] of currentParams.entries()) {
      newParams[key] = value;
    }

    setCurrent(newParams);
  }, [searchParams]);

  // update url by means of externally exposed function
  const updateParams = (newParams) => {
    const params = new URLSearchParams();

    for (const key in newParams) {
      if (newParams.hasOwnProperty(key)) {
        params.set(key, newParams[key]);
        if (typeof window != 'undefined') {
          localStorage.setItem(key, newParams[key]);
        }
      }
    }

    router.replace(pathName + '?' + params.toString());
  };

  return { params: current, setParams: updateParams };
};
