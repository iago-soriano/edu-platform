import { BaseContentDTODataBuilder } from "./base";
import { FileDataBuilder } from "./file";
import { ContentTypes } from "@domain";

export class ImageContentDTODataBuilder extends BaseContentDTODataBuilder {
  private fileDataBuilder!: FileDataBuilder;

  constructor() {
    super();
    this.fileDataBuilder = new FileDataBuilder();
    this.withType(ContentTypes.Image);
  }

  reset() {
    super.reset();
    this.withType(ContentTypes.Image);
    this.data.payload.image = {
      url: "url falsfdsffdsa",
      file: this.fileDataBuilder?.build(),
    };
  }

  withPayload(payload: { url?: string; file?: Express.Multer.File }) {
    this.data.payload.image = payload;
    return this;
  }
}
