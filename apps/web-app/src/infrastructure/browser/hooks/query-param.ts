import { NextRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export const useQueryParam = (paramName: string, router: NextRouter) => {
  const param = useMemo<string>(
    () =>
      Array.isArray(router.query[paramName])
        ? router.query[paramName][0]
        : (router.query[paramName] as string),
    [router.isReady]
  );
  return router.isReady ? { data: param } : null;
};
