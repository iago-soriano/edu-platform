import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { CollectionListResponse } from "@endpoints";
import { Icons, Tooltip, LinkWithIcon } from "@components";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";

const columnHelper =
  createColumnHelper<
    CollectionListResponse["isOwnerOf"]["collections"][number]
  >();
export const privateCollectionColumns = [
  columnHelper.accessor("name", {
    header: () => <p className="text-left">Name</p>,
    cell: (info) => <p className="text-left">{info.getValue()}</p>,
    // size: 250,
  }),
  columnHelper.accessor("draftVersionsCount", {
    header: () => <span>Drafts in progress</span>,
    cell: (info) => <span>{info.getValue()}</span>,
    // size: 50,
  }),
  columnHelper.accessor("totalActivitiesCount", {
    header: () => <span>Total Activities</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("totalParticipantsCount", {
    header: () => <span># of Participants</span>,
    cell: (info) => <span>{info.getValue()}</span>,
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
  }),
  columnHelper.accessor("updatedAt", {
    header: () => <span>Last Edited</span>,
    cell: (info) => (
      <span>{getLocaleDateTimeFromISO(info.getValue().toString())}</span>
    ),
    // size: 200,
  }),

  columnHelper.accessor("id", {
    header: () => <span>Edit</span>,
    cell: (info) => (
      <LinkWithIcon
        href={Router.editCollection(info.getValue())}
        icon="CAN_SEE"
      />
    ),
  }),
];
