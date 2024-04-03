import {
  activities,
  activityContents,
  activityVersions,
} from "@infrastructure";
import {
  Activity,
  ActivityVersion,
  BaseElement,
  VideoContent,
  ImageContent,
  TextContent,
  ContentTypes,
} from "@domain";

export class ActivitySerializer {
  static serializeActivity(domain: Activity) {
    const dto: typeof activities.$inferInsert = {
      id: domain.id,
      authorId: domain.authorId,
      draftVersionId: domain.draftVersion?.id || null,
      lastVersionId: domain.lastVersion?.id || null,
      updatedAt: new Date(),
      collectionId: domain.collectionId,
    };

    return dto;
  }

  static serializeVersion(domain: ActivityVersion) {
    const dto: typeof activityVersions.$inferInsert = {
      id: domain.id,
      title: domain.title.toString(),
      description: domain.description.toString(),
      topics: domain.topics.toString(),
      version: domain.version,
      activityId: domain.activityId,
      updatedAt: new Date(),
    };

    return dto;
  }

  static serializeContent(domain: BaseElement) {
    const content: typeof activityContents.$inferInsert = {
      type: "",
      versionId: "0",
      payload: "",
    };

    if (domain instanceof VideoContent) {
      content.payload = JSON.stringify({
        tracks: domain.tracks,
        url: domain.url,
      });
      content.type = ContentTypes.Video;
    } else if (domain instanceof ImageContent) {
      content.payload = JSON.stringify({ url: domain.url });

      content.type = ContentTypes.Image;
    } else if (domain instanceof TextContent) {
      content.payload = JSON.stringify({ text: domain.text });
      content.type = ContentTypes.Text;
    } else throw new Error();

    content.updatedAt = new Date();
    content.description = domain.description?.toString();
    content.order = domain.order;
    content.versionId = domain.versionId;

    return content;
  }
}
