import { createColumnHelper } from "@tanstack/react-table";
import {
  ListMyActivitiesQuery,
  ListMyActivitiesResponseBody,
  listMyActivitiesQuerySchema as paramsSchema,
} from "@edu-platform/common/api";

// import {
//   Button
// } from '@components/ui/Button'
import Link from "next/link";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";
import {
  cellSizes,
  CenteredCell,
  LeftHeader,
} from "@components/ui/table/config";
import {
  LanguageCell,
  TypeCell,
  LevelCell,
  TopicsCell,
} from "@components/ActivityGridCells";

const columnHelper =
  createColumnHelper<ListMyActivitiesResponseBody["data"][number]>();

export const columns = [
  columnHelper.accessor("title", {
    header: () => <LeftHeader name="Title" />,
    cell: (info) => <p className="text-left">{info.getValue()}</p>,
  }),
  columnHelper.accessor("language", {
    header: () => <span>Language</span>,
    cell: LanguageCell,
    size: cellSizes.sm,
  }),
  columnHelper.accessor("type", {
    header: () => <span>Type</span>,
    cell: TypeCell,
    size: cellSizes.sm,
  }),
  columnHelper.accessor("level", {
    header: () => <span>Level</span>,
    cell: LevelCell,
    size: cellSizes.sm,
  }),

  columnHelper.accessor("topics", {
    header: () => <span>Topics</span>,
    cell: TopicsCell,
    size: cellSizes.md,
  }),

  // columnHelper.accessor("id", {
  //   header: () => <span>Edit</span>,
  //   cell: (info) => (
  //     <Link
  //       href={Router.collectionSettings(info.getValue())}
  //       // withIcon="CAN_SEE"
  //     />
  //   ),
  //   size: cellSizes.sm,
  // }),
];
