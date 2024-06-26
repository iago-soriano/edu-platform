import { activityContents } from "../../schema";
import {
  ActivitElementDescription,
  Content,
  BaseElement,
  VideoContent,
  ImageContent,
  TextContent,
  ContentTypes,
} from "@core/domain/entities";
import { SilentInvalidStateError } from "@edu-platform/common";
import { ChangeTrackingProxy, Entity } from "@edu-platform/common/platform";

export class ActivityContentSerializer {
  static serialize(domain: Content) {
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
    } else throw new Error("Content type not found");

    content.updatedAt = new Date();
    content.description = domain.description?.toString();
    content.order = domain.order;
    content.versionId = domain.versionId;

    return content;
  }

  static deserialize(dto: typeof activityContents.$inferSelect) {
    let newContent = null;
    const parsedPayload = dto.payload as any;

    switch (dto.type) {
      case ContentTypes.Video:
        const newVideo = new VideoContent();

        newVideo.tracks = parsedPayload.tracks;
        newVideo.url = parsedPayload.url;

        newVideo.payload = parsedPayload;

        newContent = PayloadMappingProxyFactory.from(newVideo, [
          "tracks",
          "url",
        ]) as VideoContent;

        break;
      case ContentTypes.Image:
        const newImage = new ImageContent();

        newImage.url = parsedPayload.url;

        newImage.payload = parsedPayload;

        newContent = PayloadMappingProxyFactory.from(newImage, [
          "url",
        ]) as ImageContent;

        break;
      case ContentTypes.Text:
        const newText = new TextContent();

        newText.text = parsedPayload.text;

        newText.payload = parsedPayload;

        newContent = PayloadMappingProxyFactory.from(newText, [
          "text",
        ]) as TextContent;

        break;
      default:
        throw new SilentInvalidStateError(
          `Content of type ${dto.type} does not exist`
        );
    }

    newContent.id = dto.id;
    newContent.versionId = dto.versionId;

    newContent.description = new ActivitElementDescription(dto.description);
    newContent.order = dto.order;

    newContent.isNew = false;

    const proxied = new ChangeTrackingProxy(newContent) as Content;
    return proxied;
  }
}

class PayloadMappingProxyFactory {
  static from(obj: Content, mappableProperties: string[]) {
    return new Proxy(obj, {
      set: (target: Entity, prop: string, value: any) => {
        if (mappableProperties.includes(prop)) {
          const currentPayload = (target as Content).payload;
          const newPayload = { ...currentPayload, [prop]: value };
          Reflect.set(target, "payload", newPayload);
          Reflect.set(target, "_events", {
            ...target._events,
            payload: JSON.stringify(newPayload),
          });
        }

        Reflect.set(target, prop, value);
        return true;
      },
    });
  }
}
