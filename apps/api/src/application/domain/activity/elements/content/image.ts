import { Content, ContentTypes } from "./base";

export class ImageContent extends Content {
  public url?: string;
  public file: any;

  constructor() {
    super(ContentTypes.Image);
  }

  _mergePayload(newContent: ImageContent) {
    if (newContent.url) this.url = newContent.url;
  }

  hasContent() {
    return !!this.url;
  }

  validatePayload(): void {}

  storedFileUrl(): string {
    return this.url || "";
  }

  setFileUrl(url: string) {
    this.url = url;
  }
}