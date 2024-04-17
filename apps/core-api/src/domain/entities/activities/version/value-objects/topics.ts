import { ValueObject } from "@edu-platform/common/platform";
import { InvalidStateError } from "@edu-platform/common";

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
        throw new InvalidStateError(
          `Topic ${topic} is too long. Max length is ${topicMaxLength} characters`,
          { fieldName: "topics" }
        );
    }
  }

  toString() {
    return this._data || "";
  }
}
