/* "use client";
import { Button } from "@components";
import {
  useCreateNewActivityMutation,
  useListCollectionsForOwnerQuery,
  useCreateNewCollectionMutation,
} from "@endpoints";
import { Router, useParamsState, useLocalStorageState } from "@infrastructure";
import {
  useRouter,
  useSearchParams,
  usePathname,
  redirect,
} from "next/navigation";
export const NewActivityButton = () => {
  const router = useRouter();

  const createCollectionMutation = useCreateNewActivityMutation({
    onSuccess: (args) => {
      console.log({ args });
      router.push(Router.previewDraft(args?.activityId));
    },
  });
  return (
    <Button
      withIcon="PLUS"
      variant="action"
      size="lg"
      isLoading={createCollectionMutation.isPending}
      onClick={() => createCollectionMutation.mutate({})}
    >
      New Collection
    </Button>
  );
};
 */
