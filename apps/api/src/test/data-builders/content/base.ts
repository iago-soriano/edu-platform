import { AbstractBuilder } from "../abstract-builder";
import { ContentDTO } from "@dto";
import { ContentTypes } from "@domain";
import { DomainRules } from "@edu-platform/common";

export class BaseContentDTODataBuilder extends AbstractBuilder<ContentDTO> {
  constructor() {
    super();
  }

  reset() {
    this.data = {
      type: ContentTypes.Image,
      order: 2,
      payload: {},
      title: "t".repeat(
        (DomainRules.CONTENT.TITLE.MIN_LENGTH +
          DomainRules.CONTENT.TITLE.MAX_LENGTH) /
          2
      ),
      description: "d".repeat(
        (DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH +
          DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) /
          2
      ),
      id: 5,
      versionId: 7,
    };
  }

  protected withType(type: ContentTypes) {
    this.data.type = type;
    return this;
  }

  withTitle(title: string) {
    this.data.title = title;
    return this;
  }

  withLongTitle() {
    this.data.title = "t".repeat(DomainRules.CONTENT.TITLE.MAX_LENGTH + 1);
    return this;
  }

  withShortTitle() {
    this.data.title = "t".repeat(DomainRules.CONTENT.TITLE.MIN_LENGTH - 1);
    return this;
  }

  withDescription(description: string) {
    this.data.description = description;
    return this;
  }

  withLongDescription() {
    this.data.description = "d".repeat(
      DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH + 1
    );
    return this;
  }

  withShortDescription() {
    this.data.description = "d".repeat(
      DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH - 1
    );
    return this;
  }

  withOrder(order: number) {
    this.data.order = order;
    return this;
  }

  withId(id: number) {
    this.data.id = id;
    return this;
  }
}
