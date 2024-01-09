import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { axios } from "@infrastructure";
import Activities from "./client";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Published"],
    queryFn: () => axios.get.bind(axios)("activities?statuses=Published"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Activities />
    </HydrationBoundary>
  );
};

export default Page;
