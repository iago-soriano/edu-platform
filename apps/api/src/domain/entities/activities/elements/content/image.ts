import { Content, ContentTypes } from "./base";
import { FileType, ContentRequestDTO } from "@edu-platform/common";
import {
  resolveDomainServicesRegistry,
  IDomainServiceRegistry,
} from "@domain/services";

export class ImageContent extends Content {
  public url?: string;
  public file: FileType | null = null;

  private _domainServiceRegistry: IDomainServiceRegistry;

  constructor() {
    super(ContentTypes.Image);
    this._domainServiceRegistry = resolveDomainServicesRegistry();
  }

  hasContent() {
    return !!this.url;
  }

  _validatePayload() {}

  _mergePayload(newContent: ContentRequestDTO) {
    if (newContent.payload?.image?.file !== undefined)
      this.file = newContent.payload?.image?.file;
  }
  public async update(
    contentDto: ContentRequestDTO,
    activityId?: string,
    versionId?: string
  ) {
    super.update(contentDto);
    if (this.file && (!activityId || !versionId || !this.id))
      throw new Error("Missing parameters to upload file");

    if (!this.file) return;

    await this._domainServiceRegistry.uploadActivityContent(
      activityId!,
      versionId!,
      this.id as number,
      this.file!
    );
  }
}
