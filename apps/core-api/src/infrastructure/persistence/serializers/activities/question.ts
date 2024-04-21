import { activityQuestions } from "../../schema";
import {
  ActivitElementDescription,
  Content,
  Question,
  MultipleChoiceQuestion,
  TextQuestion,
  QuestionTypes,
  Alternative,
} from "@domain/entities";
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";

export class ActivityQuestionSerializer {
  static serialize(domain: Question) {
    const question: typeof activityQuestions.$inferInsert = {
      type: "",
      versionId: "0",
    };

    if (domain instanceof MultipleChoiceQuestion) {
      question.alternatives = JSON.stringify(
        domain.alternatives?.map((alt) => ({
          isCorrect: alt.isCorrect,
          comment: alt.comment,
          text: alt.text,
        }))
      );
    } else if (domain instanceof TextQuestion) {
      question.answer = domain.answer;
    } else throw new Error("Question type not found");

    question.updatedAt = new Date();
    question.description = domain.description?.toString();
    question.type = domain.type;

    question.question = domain.question;

    question.order = domain.order;
    question.versionId = domain.versionId;

    return question;
  }

  static deserialize(dto: typeof activityQuestions.$inferSelect) {
    let newQuestion = null;

    switch (dto.type) {
      case QuestionTypes.MultipleChoice:
        newQuestion = new MultipleChoiceQuestion();
        newQuestion.alternatives = (dto.alternatives as any)?.map(
          (alt: any) => {
            const alternative = new Alternative();
            alternative.comment = alt.comment;
            alternative.isCorrect = alt.isCorrect;
            alternative.text = alt.text;
            return alternative;
          }
        );
        break;
      case QuestionTypes.Text:
        newQuestion = new TextQuestion();
        newQuestion.answer = dto.answer || "";
        break;

      default:
        throw new Error(`Question of type ${dto.type} does not exist`);
    }

    newQuestion.id = dto.id;
    newQuestion.versionId = dto.versionId;

    newQuestion.question = dto.question || "";

    newQuestion.description = new ActivitElementDescription(dto.description);
    newQuestion.order = dto.order;

    newQuestion.isNew = false;

    const proxied = new ChangeTrackingProxy(newQuestion) as Content;
    return proxied;
  }
}
