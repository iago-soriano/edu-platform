import { BaseElement } from "../abstract-element";
import { CustomError, ContentRequestDTO } from "@edu-platform/common";
import { ActivitElementDescription } from "../value-objects/description";

export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

export abstract class Content extends BaseElement {
  public payload: object = {};

  constructor(public type: ContentTypes) {
    super("Content");
  }

  abstract hasContent(): boolean;

  public isEmpty() {
    return (this.description?.isEmpty() || true) && !this.hasContent();
  }

  private _isHalfCompleted() {
    return !this.description?.isEmpty() && !this.hasContent();
  }

  protected abstract _validatePayload(): void;
  public validateSelf() {
    if (this.description) this.description?.validate();
    this._validatePayload();
  }

  protected abstract _mergePayload(newValues: ContentRequestDTO): void;
  public async update(contentDto: ContentRequestDTO) {
    if (contentDto.description) {
      const newDesc = new ActivitElementDescription(contentDto.description);
      this.description = newDesc;
    }
    this._mergePayload(contentDto);

    this.validateSelf();
  }

  public checkValidityForPublication() {
    return !this._isHalfCompleted();
  }
}
