import {
  collections,
  activityContents,
  activityVersions,
} from "@infrastructure";
import {
  Collection,
  ActivityVersion,
  BaseElement,
  VideoContent,
  ImageContent,
  TextContent,
  ContentTypes,
} from "@domain";

export class CollectionSerializer {
  static serializeCollection(domain: Collection) {
    const dto: typeof collections.$inferInsert = {
      name: domain.name.toString(),
      description: domain.description.toString(),
      ownerId: domain.ownerId,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  }
}
