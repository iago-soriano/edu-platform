// import { ServerError, ApiClient } from "@edu-platform/common";
// import { useAxiosAuth } from "@infrastructure";
// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
//   UseMutationResult,
//   UseQueryResult,
//   MutationFunction,
//   QueryFunction
// } from "@tanstack/react-query";
// import { errorToast } from "@components";

// export const useBaseQuery = <Params, Res>({
//   queryFn,
//   queryKey,
//   ...args
// }: {
//   queryFn: (client: ApiClient, args: Params) => Promise<Res>;
//   queryKey?: string[];
// } & Params) => {
//     const axios = useAxiosAuth();
//     const client = new ApiClient(axios);

//     return useQuery<Res, ServerError>({
//         queryKey,
//         queryFn: () => queryFn(client, args as Params),
//       });
// };

// export const useGetStudentsOfCollectionQuery = ({
//   collectionId,
// }: GetStudentsParams) =>
//   useBaseQuery<GetStudentsParams, GetStudentsResponse>({
//     queryKey: [`collection-participations-${collectionId}`],
//     queryFn: (client) => client.getStudentsOfCollection({ collectionId }),
//     collectionId,
//   });
