import { parseVersionStatus } from "@edu-platform/common";
import {
  activities,
  collections,
  activityVersions,
  users,
} from "@infrastructure";
import { ActivityVersion, VersionStatus } from "./activity-version";
import { ChangeTrackingProxy } from "application/domain/abstract";
import { ContentFactory, Content } from "../elements";

export class VersionFactory {
  static fromDbDTOWithProxy(
    dto: typeof activityVersions.$inferSelect,
    _events: { [prop: string]: string | number }
  ) {
    const version = new ActivityVersion(
      dto.id,
      dto.title,
      dto.description,
      dto.topics,
      dto.version,
      parseVersionStatus(dto.status)
    );

    version.isNew = false;
    version.activityId = dto.activityId;

    const proxiedEntity = new ChangeTrackingProxy(
      version,
      _events
    ) as ActivityVersion;

    return proxiedEntity;
  }

  static fromAnotherVersionWithElements(
    toCopyFrom: ActivityVersion,
    newId: string
  ) {
    const newDraft = new ActivityVersion(
      newId,
      toCopyFrom.title.toString(),
      toCopyFrom.description.toString(),
      toCopyFrom.topics.toString(),
      toCopyFrom.version + 1,
      VersionStatus.Draft
    );

    for (const element of toCopyFrom.elements) {
      if (element.elementType === "Content") {
        const newContent = ContentFactory.fromAnotherContent(
          element as Content
        );
        newContent.versionId = newDraft.id;
        newDraft.elements.push(newContent);
      }
    } // TODO: copy questions

    return newDraft;
  }
}
