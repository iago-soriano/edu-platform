import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { CollectionListResponse } from "@endpoints";
import { LinkWithIcon } from "@components";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";

const columnHelper =
  createColumnHelper<
    CollectionListResponse["isOwnerOf"]["collections"][number]
  >();
export const publicCollectionColumns = [
  columnHelper.accessor("name", {
    header: () => <p className="text-left">Name</p>,
    cell: (info) => <p className="text-left">{info.getValue()}</p>,
    // size: 250,
  }),
  columnHelper.accessor("draftVersionsCount", {
    header: () => <span>Drafts in progress</span>,
    cell: (info) => info.getValue(),
    // size: 50,
  }),
  columnHelper.accessor("totalActivitiesCount", {
    header: () => <span>Total Activities</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("totalParticipantsCount", {
    header: () => <span># of Followers</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.accessor("updatedAt", {
    header: () => <span>Last Edited</span>,
    cell: (info) => getLocaleDateTimeFromISO(info.getValue().toString()),
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
