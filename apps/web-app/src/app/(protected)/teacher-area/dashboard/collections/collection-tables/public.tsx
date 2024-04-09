import { createColumnHelper } from "@tanstack/react-table";
import { CollectionListOwnerResponse } from "@endpoints";
import {
  LinkWithIcon,
  CenteredCell,
  CenteredDateCell,
  LeftHeader,
  cellSizes,
} from "@components";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";

const columnHelper =
  createColumnHelper<CollectionListOwnerResponse["data"][number]>();
export const publicCollectionColumns = [
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
      <LinkWithIcon
        href={Router.collectionSettings(info.getValue())}
        icon="CAN_SEE"
      />
    ),
    size: cellSizes.sm,
  }),
];
