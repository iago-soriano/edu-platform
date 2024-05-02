import { createColumnHelper } from "@tanstack/react-table";
import { ListCollectionsForOwnerResponse } from "@endpoints";
import {
  Icons,
  Tooltip,
  LinkWithIcon,
  CenteredCell,
  CenteredDateCell,
  LeftHeader,
  cellSizes,
  CenteredCellWithLink,
} from "@components";
import { Router } from "@infrastructure";

const columnHelper =
  createColumnHelper<ListCollectionsForOwnerResponse["data"][number]>();

export const privateCollectionColumns = [
  columnHelper.accessor("name", {
    header: () => <LeftHeader name="Name" />,
    cell: (info) => <p className="text-left">{info.getValue()}</p>,
  }),
  columnHelper.accessor("draftVersionsCount", {
    header: () => <span>Drafts in progress</span>,
    cell: (info) => (
      <CenteredCellWithLink
        href={Router.collectionActivities(info.row.original.id)}
        value={info.getValue()}
      />
    ),
    size: cellSizes.sm,
  }),
  columnHelper.accessor("totalActivitiesCount", {
    header: () => <span>Total Activities</span>,
    cell: (info) => (
      <CenteredCellWithLink
        href={Router.collectionActivities(info.row.original.id)}
        value={info.getValue()}
      />
    ),
    size: cellSizes.sm,
  }),
  columnHelper.accessor("totalParticipantsCount", {
    header: () => <span># of Participants</span>,
    cell: (info) => (
      <CenteredCellWithLink
        href={Router.collectionStudents(info.row.original.id)}
        value={info.getValue()}
      />
    ),
    size: cellSizes.sm,
  }),
  columnHelper.accessor("notifyOwnerOnStudentOutput", {
    header: () => <p className="text-center">Notifications</p>,
    cell: (info) => (
      <p className="flex flex-row justify-center">
        {info.getValue() ? (
          <Tooltip content="You will get notified when students complete activities">
            <span>
              <Icons.NOTIFICATION />
            </span>
          </Tooltip>
        ) : (
          <Tooltip content="You will not get notified when students complete activities">
            <span>
              <Icons.NOTIFICATIONSLASH />
            </span>
          </Tooltip>
        )}
      </p>
    ),
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
      <p className="flex flex-row justify-center">
        <LinkWithIcon
          href={Router.collectionSettings(info.getValue())}
          icon="CAN_SEE"
        />
      </p>
    ),
    size: cellSizes.sm,
  }),
];
