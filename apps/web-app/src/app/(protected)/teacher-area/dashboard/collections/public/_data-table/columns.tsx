import { createColumnHelper } from "@tanstack/react-table";
import { ListCollectionsForOwnerResponse } from "@endpoints";
import {
  Link,
  CenteredCell,
  CenteredDateCell,
  LeftHeader,
  cellSizes,
} from "@components";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";

const columnHelper =
  createColumnHelper<ListCollectionsForOwnerResponse["data"][number]>();

export const columns = [
  columnHelper.accessor("name", {
    header: () => <LeftHeader name="Name" />,
    cell: (info) => <p className="text-left">{info.getValue()}</p>,
  }),
  columnHelper.accessor("draftVersionsCount", {
    header: () => <span>Drafts in progress</span>,
    cell: CenteredCell,
    size: cellSizes.sm,
  }),
  columnHelper.accessor("totalActivitiesCount", {
    header: () => <span>Total Activities</span>,
    cell: CenteredCell,
    size: cellSizes.sm,
  }),
  columnHelper.accessor("totalParticipantsCount", {
    header: () => <span># of Followers</span>,
    cell: CenteredCell,
    size: cellSizes.sm,
  }),

  columnHelper.accessor("updatedAt", {
    header: () => <span>Last Edited</span>,
    cell: CenteredDateCell,
    size: cellSizes.md,
  }),

  columnHelper.accessor("id", {
    header: () => <span>Edit</span>,
    cell: (info) => (
      <Link
        href={Router.collectionSettings(info.getValue())}
        withIcon="CAN_SEE"
      />
    ),
    size: cellSizes.sm,
  }),
];
