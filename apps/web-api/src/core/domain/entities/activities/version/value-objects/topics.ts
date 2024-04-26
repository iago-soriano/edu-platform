import { ValueObject } from "@edu-platform/common/platform";
import { InvalidStateError } from "@edu-platform/common";

const topicsMaxCount = 10;
const topicMaxLength = 20;

const throwTopicsValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "topics" });
};

export class ActivityVersionTopics extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) return;
    const topicsArray = this._data.split(",");
    if (topicsArray.length > topicsMaxCount) {
      throwTopicsValidationError(
        `Too many topics. Max number allowed is ${topicsMaxCount}`
      );
    }

    for (const topic of topicsArray) {
      if (topic.length > topicMaxLength)
        throwTopicsValidationError(
          `Topic ${topic} is too long. Max length is ${topicMaxLength} characters`
        );
    }
  }

  toString() {
    return this._data || "";
  }
}
