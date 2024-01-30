import { Content, ContentTypes } from "./base";

export class ImageContent extends Content {
  public url: string = "";

  constructor() {
    super(ContentTypes.Image);
  }

  mergePayload(newContent: ImageContent) {
    this.url = newContent.url;
  }

  hasContent() {
    return !!this.url;
  }

  validatePayload(): void {}

  storedFileUrl(): string {
    return this.url;
  }

  setFileUrl(url: string) {
    this.url = url;
  }
}
