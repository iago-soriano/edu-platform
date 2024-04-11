import { activityContents } from "../../schema";
import {
  ActivitElementDescription,
  Content,
  BaseElement,
  VideoContent,
  ImageContent,
  TextContent,
  ContentTypes,
} from "@domain/entities";
import { ChangeTrackingProxy } from "@domain/abstract";
import { ChangeEventsTree } from "../../interfaces";

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
    } else throw new Error();

    content.updatedAt = new Date();
    content.description = domain.description?.toString();
    content.order = domain.order;
    content.versionId = domain.versionId;

    return content;
  }

  static deserialize(
    dto: typeof activityContents.$inferSelect,
    _events: ChangeEventsTree[string]
  ) {
    let newContent = null;
    const parsedPayload = dto.payload as any;

    let events: { [prop: string]: string | number } = {};

    switch (dto.type) {
      case ContentTypes.Video:
        const newVideo = new VideoContent();

        newVideo.tracks = parsedPayload.tracks;
        newVideo.url = parsedPayload.url;

        newVideo.payload = parsedPayload;

        _events.VideoContent = {
          ..._events.VideoContent,
          [dto.id]: {},
        };

        events = _events.VideoContent[dto.id];

        newContent = PayloadMappingProxyFactory.from(
          newVideo,
          ["tracks", "url"],
          events
        ) as VideoContent;

        break;
      case ContentTypes.Image:
        const newImage = new ImageContent();

        newImage.url = parsedPayload.url;

        newImage.payload = parsedPayload;

        _events.ImageContent = {
          ..._events.ImageContent,
          [dto.id]: {},
        };

        events = _events.ImageContent[dto.id];

        newContent = PayloadMappingProxyFactory.from(
          newImage,
          ["url"],
          events
        ) as ImageContent;

        break;
      case ContentTypes.Text:
        const newText = new TextContent();

        newText.text = parsedPayload.text;

        newText.payload = parsedPayload;

        _events.TextContent = {
          ..._events.TextContent,
          [dto.id]: {},
        };

        events = _events.TextContent[dto.id];

        newContent = PayloadMappingProxyFactory.from(
          newText,
          ["text"],
          events
        ) as TextContent;

        break;
      default:
        throw new Error(`Content of type ${dto.type} does not exist`);
    }

    newContent.id = dto.id;
    newContent.versionId = dto.versionId;

    newContent.description = new ActivitElementDescription(dto.description);
    newContent.order = dto.order;

    newContent.isNew = false;

    const proxied = new ChangeTrackingProxy(newContent, events) as Content;
    return proxied;
  }
}

class PayloadMappingProxyFactory {
  static from(
    obj: Content,
    mappableProperties: string[],
    _events: { [prop: string]: string | number }
  ) {
    return new Proxy(obj, {
      set: (target: object, prop: string, value: any) => {
        if (mappableProperties.includes(prop)) {
          const currentPayload = (target as Content).payload;
          const newPayload = { ...currentPayload, [prop]: value };
          Reflect.set(target, "payload", newPayload);
          _events["payload"] = JSON.stringify(newPayload);
          return false;
        } else {
          Reflect.set(target, prop, value);
        }
        return true;
      },
    });
  }
}
