import { ContentRequestDTO } from "@edu-platform/common";
import {
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
  Content,
} from "../elements/content";
import { ActivitElementDescription } from "../elements/value-objects/description";

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
