import { OutputStatus } from "@edu-platform/common/domain/enums";
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
    public status: OutputStatus,
    public answers: Answer[]
  ) {
    super();
  }

  public updateAnswers(newAnswers: { answer: string; blockId: string }[]) {
    this.answers.forEach((ans) => {
      newAnswers.map((newAns) => {
        if (newAns.blockId === ans.blockId) {
          ans.answer = newAns.answer;
        }
      });
    });
  }

  public updateReviews(newReviews: { review: string; blockId: string }[]) {
    this.answers.forEach((ans) => {
      newReviews.map((newRvw) => {
        if (newRvw.blockId === ans.blockId) {
          ans.review = newRvw.review;
        }
      });
    });
  }
}
