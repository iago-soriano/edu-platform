import { AbstractBuilder } from "@test";
import { ContentDTO } from "@dto";
import { ContentTypes } from "@domain";

export class BaseContentDTODataBuilder extends AbstractBuilder<ContentDTO> {
  constructor() {
    super();
  }

  reset() {
    this.data = {
      type: ContentTypes.Image,
      order: 0,
      payload: {},
      title: "título",
      description: "description",
      id: 5,
      parentId: 6,
      originatingVersionId: 7,
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

  withDescription(description: string) {
    this.data.description = description;
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

  withParentId(id: number) {
    this.data.parentId = id;
    return this;
  }

  withOriginatingVersionId(id: number) {
    this.data.originatingVersionId = id;
    return this;
  }
}
