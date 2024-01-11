import {
  ActivityStatusNotFound,
  TitleIsTooLong,
  TitleIsTooShort,
  DescriptionIsTooLong,
  DescriptionIsTooShort,
  HasTooManyTopics,
  DomainRules,
} from "@edu-platform/common";

export const ActivityPossibleStatus = [
  "Draft",
  "Archived",
  "Published",
] as const;

export type ActivityStatusType = (typeof ActivityPossibleStatus)[number];

export class Activity {
  static validateTitle(title: string) {
    if (title.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new TitleIsTooLong();
    } else if (title.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH) {
      throw new TitleIsTooShort();
    }
  }

  static validateDescription(description: string) {
    if (description.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH) {
      throw new DescriptionIsTooLong();
    } else if (
      description.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH
    ) {
      throw new DescriptionIsTooShort();
    }
  }

  static validateTopics(topics: string) {
    const topicsArray = topics.split(",");
    if (topicsArray.length > DomainRules.ACTIVITY.TOPICS.MAX_COUNT) {
      throw new HasTooManyTopics();
    }
  }

  static validateStatuses(activityStatuses: string[]) {
    const resp = [];
    const sanitizedDomain = ActivityPossibleStatus.map((st) =>
      st.toLowerCase()
    );

    for (let status of activityStatuses) {
      if (sanitizedDomain.includes(status.toLowerCase())) {
        resp.push(status);
      } else {
        throw new ActivityStatusNotFound({ status });
      }
    }

    return resp;
  }

  static hasPublishedVersion(latestVersion: number) {
    return !!latestVersion;
  }

  static hasDraft(draftVersion: number) {
    return !!draftVersion;
  }
}
