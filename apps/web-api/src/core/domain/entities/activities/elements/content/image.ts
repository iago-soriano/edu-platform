import { Content, ContentTypes } from "./base";
import {
  FileType,
  SaveContentRequestBody,
  SilentInvalidStateError,
} from "@edu-platform/common";
import { IDomainServiceRegistry } from "../../../../services";
import { resolveDomainServicesRegistry } from "../../../../services/resolve";

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

  _mergePayload(newContent: SaveContentRequestBody) {
    if (newContent.payload?.image?.file !== undefined)
      this.file = newContent.payload?.image?.file;
  }
  public async update(
    contentDto: SaveContentRequestBody,
    activityId?: string,
    versionId?: string
  ) {
    super.update(contentDto);
    if (this.file && (!activityId || !versionId || !this.id))
      throw new SilentInvalidStateError("Missing parameters to upload file");

    if (!this.file) return;

    const newFileUrl = await this._domainServiceRegistry.uploadActivityContent(
      activityId!,
      versionId!,
      this.id as number,
      this.file!
    );
    this.url = newFileUrl;
  }
}
