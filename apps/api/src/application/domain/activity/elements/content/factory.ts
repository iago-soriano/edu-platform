import { CustomError, ContentRequestDTO } from "@edu-platform/common";
import {
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
  Content,
} from ".";
import { ActivitElementDescription } from "../value-objects/description";
import { activityContents, activityVersions } from "@infrastructure";
import { ChangeTrackingProxy } from "application/domain/abstract";

export class ContentFactory {
  static fromRequestDto(dto: ContentRequestDTO) {
    let newContent = null;

    switch (dto.type) {
      case ContentTypes.Video:
        newContent = new VideoContent();

        newContent.tracks = dto.payload?.video?.tracks || "";
        newContent.url = dto.payload?.video?.url || "";
        break;

      case ContentTypes.Image:
        newContent = new ImageContent();

        newContent.url = dto.payload?.image?.url;
        newContent.file = dto.payload?.image?.file || null;
        break;

      case ContentTypes.Text:
        newContent = new TextContent();

        newContent.text = dto.payload?.text?.text;
        break;

      default:
        throw new Error(`Content of type ${dto.type} does not exist`);
    }

    newContent.description = new ActivitElementDescription(
      dto.description === undefined ? null : dto.description
    );

    newContent.id = dto.id;

    return newContent;
  }

  static fromDbDTOWithProxy(
    dto: typeof activityContents.$inferSelect,
    _events: { [prop: string]: string | number }
  ) {
    let newContent = null;
    const parsedPayload = dto.payload as any;

    switch (dto.type) {
      case ContentTypes.Video:
        const newVideo = new VideoContent();

        newVideo.tracks = parsedPayload.tracks;
        newVideo.url = parsedPayload.url;

        newVideo.payload = parsedPayload;

        const videoMappableProperties = ["tracks", "url"];

        newContent = PayloadMappingProxyFactory.create(
          newVideo,
          videoMappableProperties,
          _events
        ) as VideoContent;

        break;
      case ContentTypes.Image:
        const newImage = new ImageContent();

        newImage.url = parsedPayload.url;

        newImage.payload = parsedPayload;

        const imageMappableProperties = ["url"];

        newContent = PayloadMappingProxyFactory.create(
          newImage,
          imageMappableProperties,
          _events
        ) as ImageContent;

        break;
      case ContentTypes.Text:
        const newText = new TextContent();

        newText.text = parsedPayload.text;

        newText.payload = parsedPayload;

        const textMappableProperties = ["text"];

        newContent = PayloadMappingProxyFactory.create(
          newText,
          textMappableProperties,
          _events
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

    const proxied = new ChangeTrackingProxy(newContent, _events) as Content;
    return proxied;
  }

  static fromAnotherContent(toCopyFrom: Content) {
    let newContent = null;

    if (toCopyFrom instanceof VideoContent) {
      newContent = new VideoContent();

      newContent.tracks = toCopyFrom.tracks;
      newContent.url = toCopyFrom.url;
    } else if (toCopyFrom instanceof ImageContent) {
      newContent = new ImageContent();

      newContent.url = toCopyFrom.url;
    } else if (toCopyFrom instanceof TextContent) {
      newContent = new TextContent();

      newContent.text = toCopyFrom.text;
    }

    newContent!.description = toCopyFrom.description;
    newContent!.payload = toCopyFrom.payload;

    return newContent!;
  }
}

class PayloadMappingProxyFactory {
  static create(
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
