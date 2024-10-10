import { Entity } from "@edu-platform/common/platform";

export type Answer = {
  blockId: string;
  answer: string;
  review: string;
};

export class StudentOutput extends Entity {
  constructor(
    public id: string,
    public requestingUserId: string,
    public activityId: string,
    public studentEmail: string,
    public status: string,
    public answers: Answer[]
  ) {
    super();
  }

  public updateAnswer(newAnswer: string, blockId: string) {
    this.answers.forEach((ans) => {
      if (ans.blockId === blockId) {
        ans.answer = newAnswer;
      }
    });
  }

  public updateReview(newReview: string, blockId: string) {
    this.answers.forEach((ans) => {
      if (ans.blockId === blockId) {
        ans.review = newReview;
      }
    });
  }
}
