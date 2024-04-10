import { Content, ContentTypes } from "./base";
import { CustomError, ContentRequestDTO } from "@edu-platform/common";
import {
  DomainServicesRegistry,
  IDomainServiceRegistry,
} from "../../../../domain-services";

export class ImageContent extends Content {
  public url?: string;
  public file: any;

  private _domainServiceRegistry: IDomainServiceRegistry;

  constructor() {
    super(ContentTypes.Image);
    this._domainServiceRegistry = new DomainServicesRegistry();
  }

  hasContent() {
    return !!this.url;
  }

  _validatePayload() {}

  _mergePayload(newContent: ContentRequestDTO) {
    if (newContent.payload?.image?.file !== undefined)
      this.file = newContent.payload?.image?.file;
  }
  public async update(contentDto: ContentRequestDTO) {
    super.update(contentDto);
    await this._domainServiceRegistry.uploadActivityContent();
  }
}
