"use client"; // QueryClientProvider relies on useContext under the hood

import {
  isServer,
  QueryClient,
  QueryClientProvider as TanstackProvider,
} from "@tanstack/react-query";

/**
 * The browser query client instance, initialized lazily on the first call to
 * getQueryClient. This is used to persist the query client across the entire
 * application and avoid re-creating it on every render.
 */
let browserQueryClient: QueryClient | undefined;

/**
 * Creates a new instance of QueryClient with default options.
 *
 * @returns The newly created QueryClient instance.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

/**
 * Retrieves the query client. If we're on the server, we always make a new
 * query client. If we're on the browser, we only make a new query client if
 * we don't already have one.
 *
 * @note This is very important, so we don't re-make a new client if React
 * suspends during the initial render. This may not be needed if we have a
 * suspense boundary BELOW the creation of the query client
 *
 * @returns The query client instance.
 */
function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

/**
 * QueryClientProvider is a wrapper component that provides a query client
 * to the rest of the application.
 *
 * @note Avoid useState when initializing the query client if you don't
 * have a suspense boundary between this and the code that may suspend because
 * React will throw away the client on the initial render if it suspends and
 * there is no boundary
 *
 * @param children - The children components.
 * @returns The QueryClientProvider component.
 */
export const QueryClientProvider = ({ children }: { children: any }) => {
  const queryClient = getQueryClient();

  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
};
