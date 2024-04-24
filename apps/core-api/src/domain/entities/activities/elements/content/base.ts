import { BaseElement } from "../abstract-element";
import { ActivitElementDescription } from "../value-objects/description";
import { ContentRequestDTO } from "@edu-platform/common";
import { ContentTypes } from "./enums";

export { ContentTypes } from "./enums";

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
  public async update(contentDto: ContentRequestDTO, _?: string, __?: string) {
    if (contentDto.description) {
      this.description = new ActivitElementDescription(contentDto.description);
    }
    this._mergePayload(contentDto);

    this.validateSelf();
  }

  public checkValidityForPublication() {
    return !this._isHalfCompleted();
  }
}
