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
    public reviewerEmail: string,
    public activityId: string,
    public studentEmail: string,
    public status: OutputStatus,
    public answers: Answer[]
  ) {
    super();
  }

  public updateAnswers(newAnswers: { answer: string; blockId: string }[]) {
    this.answers = this.answers.map((ans) => {
      const newAnswer = newAnswers.find((x) => x.blockId === ans.blockId);
      if (newAnswer) ans.answer = newAnswer?.answer;
      return ans;
    });
  }

  public updateReviews(newReviews: { review: string; blockId: string }[]) {
    this.answers = this.answers.map((ans) => {
      const newAnswer = newReviews.find((x) => x.blockId === ans.blockId);
      if (newAnswer) ans.review = newAnswer?.review;
      return ans;
    });
  }
}
