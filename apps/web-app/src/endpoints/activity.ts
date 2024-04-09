import { useBaseMutation, UseBaseMutationCallbacksType } from "./base";
import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { ServerError, ApiClient } from "@edu-platform/common";
import { useAxiosAuth } from "@infrastructure";

// CREATE NEW ACTIVITY
type Request = Parameters<ApiClient["createNewActivity"]>[0];
type Return = Awaited<ReturnType<ApiClient["createNewActivity"]>>;

export const useCreateNewActivityMutation = (
  args: UseBaseMutationCallbacksType<Request, Return>
) =>
  useBaseMutation<Request, Return>({
    mutationFn: (client, args) =>
      client.createNewActivity({ collectionId: args.collectionId }),
    invalidateQueries: ["activities"],
    ...args,
  });

// GET DRAFT
type ParamsGetDraft = Parameters<ApiClient["getDraft"]>[0];
export type ReturnGetActivityVersion = Awaited<
  ReturnType<ApiClient["getDraft"]>
>;

export const useGetActivityDraftQuery = ({ activityId }: ParamsGetDraft) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ReturnGetActivityVersion, ServerError>({
    queryKey: ["versions/draft", { activityId }],
    queryFn: () => client.getDraft({ activityId }),
  });
};

// UPDATE DRAFT
type ParamsUpdateMetadata = Parameters<ApiClient["updateVersionMetadata"]>[0];
type ReturnUpdateMetadata = Awaited<
  ReturnType<ApiClient["updateVersionMetadata"]>
>;

export const useUpdateVersionMetadataMutation = (
  args: ParamsUpdateMetadata &
    UseBaseMutationCallbacksType<ParamsUpdateMetadata, ReturnUpdateMetadata>
) =>
  useBaseMutation<ParamsUpdateMetadata, ReturnUpdateMetadata>({
    mutationFn: (client, mArgs) => client.updateVersionMetadata(mArgs),
    invalidateQueries: ["versions/draft"],
    ...args,
  });

type ListQueryForOwnerParams = Parameters<
  ApiClient["listActivitiesForOwner"]
>[0];
type ForOwnerReturnList = Awaited<
  ReturnType<ApiClient["listActivitiesForOwner"]>
>;
export type ListQueryForOwnerReturn = UseQueryResult<
  ForOwnerReturnList,
  ServerError
>;

export const useListActivitiesForOwnerQuery = ({
  pageSize,
  page,
  collectionId,
}: ListQueryForOwnerParams) => {
  const axios = useAxiosAuth();
  const client = new ApiClient(axios);

  return useQuery<ForOwnerReturnList, ServerError>({
    queryKey: ["activities", { page, pageSize }],
    queryFn: () =>
      client.listActivitiesForOwner({
        collectionId,
        pageSize,
        page,
      }),
  });
};
type ParamsUpdateStatus = Parameters<ApiClient["publishDraft"]>[0];
type ReturnUpdateStatus = Awaited<ReturnType<ApiClient["publishDraft"]>>;

export const usePublishDraftMutation = (
  args: UseBaseMutationCallbacksType<ParamsUpdateStatus, ReturnUpdateStatus>
) =>
  useBaseMutation<ParamsUpdateStatus, ReturnUpdateStatus>({
    mutationFn: (client, args) => client.publishDraft(args),
    invalidateQueries: ["versions"],
    ...args,
  });

type ParamsCreateNewDraft = Parameters<ApiClient["createNewDraftVersion"]>[0];
type ReturnCreateNewDraft = Awaited<
  ReturnType<ApiClient["createNewDraftVersion"]>
>;
export const useCreateNewDraftVersionMutation = (
  args: UseBaseMutationCallbacksType<ParamsCreateNewDraft, ReturnCreateNewDraft>
) =>
  useBaseMutation<ParamsCreateNewDraft, ReturnCreateNewDraft>({
    mutationFn: (client, args) => client.createNewDraftVersion(args),
    invalidateQueries: ["versions"],
    ...args,
  });

// TODO infinite query
// export const useListActivityVersionsQuery = (
//   args: Partial<ListQueryParams>
// ) => {
//   const axios = useAxiosAuth();
//   const client = new ApiClient(axios);

//   return useInfiniteQuery({
//     getNextPageParam: (lastPage, allPages, lastPageParam) => lastPage.nextPage,
//     initialPageParam: 0,
//     queryKey: ["versions"],
//     queryFn: async ({ pageParam }: { pageParam: number }) => {
//       const pageSize = args.pageSize || 10;
//       const data = await client.listActivityVersions({
//         byOwnership: args.byOwnership || false,
//         collectionId: args.collectionId,
//         pageSize,
//         page: pageParam,
//       });
//       return {
//         data: data.data,
//         currentPage: pageParam,
//         nextPage:
//           pageParam + pageSize < data.pagination.totalCount
//             ? pageParam + pageSize
//             : null,
//       };
//     },
//   });
// };

type ParamsSave = Parameters<ApiClient["saveContent"]>[0];
type ReturnSave = Awaited<ReturnType<ApiClient["saveContent"]>>;

export const useSaveContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsSave, ReturnSave>
) =>
  useBaseMutation<ParamsSave, ReturnSave>({
    mutationFn: (client, args) => {
      console.log({ args });
      return client.saveContent(args);
    },
    invalidateQueries: ["version"],
    ...args,
  });

type ParamsDelete = Parameters<ApiClient["deleteContent"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteContent"]>>;

export const useDeleteContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsDelete, ReturnDelete>
) =>
  useBaseMutation<ParamsDelete, ReturnDelete>({
    mutationFn: (client, args) => client.deleteContent(args),
    invalidateQueries: ["versions"],
    ...args,
  });
