import { activities } from "@infrastructure";
import { Activity } from "./activity";
import { ActivityVersion } from "../version";
import { ChangeTrackingProxy } from "application/domain/abstract";

export class ActivityFactory {
  static fromDbDTOWithProxy(
    dto: typeof activities.$inferSelect,
    _events: { [prop: string]: string | number },
    draftVersion: ActivityVersion | null,
    lastVersion: ActivityVersion | null
  ) {
    const activity = new Activity(dto.id);

    activity.authorId = dto.authorId;
    activity.collectionId = dto.collectionId;
    activity.isNew = false;

    activity.draftVersion = draftVersion;
    activity.lastVersion = lastVersion;

    const proxiedEntity = new ChangeTrackingProxy(
      activity,
      _events
    ) as Activity;

    return proxiedEntity;
  }
}
