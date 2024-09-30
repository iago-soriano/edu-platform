import { CoreClient } from "@edu-platform/common/api";
import { cache } from "react";
import { SSRAxios } from "@infrastructure";

export const getCollectionById = cache<
  (collectionId: number) => ReturnType<CoreClient["getCollection"]>
>((collectionId) => new CoreClient(SSRAxios).getCollection({ collectionId }));

export type GetCollectionByIdResponse = Awaited<
  ReturnType<typeof getCollectionById>
>;
