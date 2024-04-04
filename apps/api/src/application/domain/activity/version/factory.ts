import { parseVersionStatus } from "@edu-platform/common";
import {
  activities,
  activityContents,
  activityVersions,
  users,
  ActivitiesRepository,
} from "@infrastructure";
import { ActivityVersion, VersionStatus } from "./activity-version";
import { ChangeTrackingProxy } from "application/domain/abstract";
import { ContentFactory, Content } from "../elements";
import { ChangeEventsTree } from "@interfaces";

export class VersionFactory {
  static fromDbDTOWithProxy(
    dto: typeof activityVersions.$inferSelect,
    _events: ChangeEventsTree<typeof ActivitiesRepository.Tables>,
    contentsDtos?: (typeof activityContents.$inferSelect | null)[]
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

    if (contentsDtos) {
      for (let content of contentsDtos) {
        version.elements.push(
          ContentFactory.fromDbDTOWithProxy(content!, _events[dto.activityId])
        );
      }
    }

    _events[dto.activityId].activityVersions = {
      ..._events[dto.activityId].activityVersions,
      [version.id]: {},
    };

    const proxiedEntity = new ChangeTrackingProxy(
      version,
      _events[dto.activityId].activityVersions[version.id]
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
