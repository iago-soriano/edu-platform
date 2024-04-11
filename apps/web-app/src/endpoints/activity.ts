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

// LIST ACTIVITIES OF COLLECTION I OWN
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

// PUBLISH DRAFT
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

// CREATE NEW DRAFT
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

// SAVE CONTENT
type ParamsSaveContent = Parameters<ApiClient["saveContent"]>[0];
type ReturnSaveContent = Awaited<ReturnType<ApiClient["saveContent"]>>;

export const useSaveContentMutation = (
  args: UseBaseMutationCallbacksType<ParamsSaveContent, ReturnSaveContent>
) =>
  useBaseMutation<ParamsSaveContent, ReturnSaveContent>({
    mutationFn: (client, args) => {
      console.log({ args });
      return client.saveContent(args);
    },
    invalidateQueries: ["version"],
    ...args,
  });

// SAVE QUESTION
type ParamsSaveElement = Parameters<ApiClient["saveQuestion"]>[0];
type ReturnSaveElement = Awaited<ReturnType<ApiClient["saveQuestion"]>>;

export const useSaveQuestionMutation = (
  args: UseBaseMutationCallbacksType<ParamsSaveElement, ReturnSaveElement>
) =>
  useBaseMutation<ParamsSaveElement, ReturnSaveElement>({
    mutationFn: (client, args) => {
      console.log({ args });
      return client.saveQuestion(args);
    },
    invalidateQueries: ["version"],
    ...args,
  });

// DELETE ELEMENT
type ParamsDelete = Parameters<ApiClient["deleteElement"]>[0];
type ReturnDelete = Awaited<ReturnType<ApiClient["deleteElement"]>>;

export const useDeleteElementMutation = (
  args: UseBaseMutationCallbacksType<ParamsDelete, ReturnDelete>
) =>
  useBaseMutation<ParamsDelete, ReturnDelete>({
    mutationFn: (client, args) => client.deleteElement(args),
    invalidateQueries: ["versions/draft"],
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
