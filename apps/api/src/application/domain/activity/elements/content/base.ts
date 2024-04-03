import { BaseElement } from "../abstract-element";
import { CustomError, ContentRequestDTO } from "@edu-platform/common";

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

  public checkValidityForPublication() {
    return !this._isHalfCompleted();
  }

  abstract hasContent(): boolean;
  protected abstract _mergePayload(newContent: Content): void;

  public merge(newContent: Content) {
    this._mergePayload(newContent);
    if (newContent.description?.hasValue())
      this.description = newContent.description;
  }

  isEmpty() {
    return this.description?.isEmpty() === true && !this.hasContent();
  }

  private _isHalfCompleted() {
    return !!(!this.description?.isEmpty() && !this.hasContent());
  }

  abstract validatePayload(): void;

  abstract setFileUrl(url: string): void;
}
