import { ValueObject } from "../../../abstract";

const topicsMaxCount = 10;
const topicMaxLength = 20;

export class ActivityVersionTopics extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) return;
    const topicsArray = this._data.split(",");
    if (topicsArray.length > topicsMaxCount) {
      throw new Error(
        `Há tópicos demais. Número máximo permitido é de ${topicsMaxCount}`
      );
    }

    for (const topic of topicsArray) {
      if (topic.length > topicMaxLength)
        throw new Error(
          `Topic is too long. Max length is ${topicMaxLength} characters`
        );
    }
  }

  toString() {
    return this._data || "";
  }
}
