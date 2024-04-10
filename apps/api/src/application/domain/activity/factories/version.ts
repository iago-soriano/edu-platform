import { ActivityVersion, VersionStatus } from "../version/activity-version";
import { Content } from "../elements";
import { ContentFactory } from "./content";
import { IIdGenerator } from "@interfaces";

export class VersionFactory {
  constructor(private idService: IIdGenerator) {}

  withElementsFrom(toCopyFrom: ActivityVersion) {
    const newDraft = new ActivityVersion(
      this.idService.getId(),
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

  emptyDraftFrom() {
    const newDraft = new ActivityVersion(
      this.idService.getId(),
      null,
      null,
      null,
      1,
      VersionStatus.Draft
    );
    return newDraft;
  }
}
