// "use client";

// import posthog from "posthog-js";
// import { PostHogProvider } from "posthog-js/react";

// posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//   api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
// });

export const PHProvider = ({ children }) => {
  // return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  return children;
};
