import { Activity, OutputStatus, Question } from "@core/domain/entities";
import { CollectionArray, Entity } from "@edu-platform/common/platform";
import { StudentAnswer } from "..";
import { SilentInvalidStateError } from "@edu-platform/common";
import { StudentAnswerFactory } from "./student-answer-factory";
export { OutputStatus } from "./enums";

export class StudentOutput extends Entity {
  public id: number;
  public studentId!: string;
  public activityAuthorId!: string;
  public activityId!: string;
  public versionNumber!: number;
  public outputStatus: OutputStatus;
  public feedbackStatus: OutputStatus;
  public answers!: CollectionArray<StudentAnswer>;

  constructor(
    id?: number,
    outputStatus?: OutputStatus,
    feedbackStatus?: OutputStatus
  ) {
    super();
    this.id = id || 0;
    this.outputStatus = outputStatus || OutputStatus.Draft;
    this.feedbackStatus = feedbackStatus || OutputStatus.Draft;
  }

  public publishStudentOutput(userId: string) {
    if (userId !== this.studentId)
      throw new SilentInvalidStateError("Student is not output author");

    if (this.outputStatus !== OutputStatus.Draft)
      throw new SilentInvalidStateError("Only draft can be changed");

    this.outputStatus = OutputStatus.Completed;
  }

  public FeedbackToAnswer(
    userId: string,
    answerId: number,
    feedbackEmoji?: string,
    feedbackText?: string
  ) {
    if (userId !== this.activityAuthorId)
      throw new SilentInvalidStateError("User is not activity author");

    if (this.outputStatus !== OutputStatus.Completed)
      throw new SilentInvalidStateError(
        "Student Output status is not completed"
      );

    if (this.feedbackStatus === OutputStatus.Completed) {
      throw new SilentInvalidStateError("Can't update a completed feedback");
    }

    let answer = this.answers.find((answ) => answ.id === answerId);
    if (!answer) throw new SilentInvalidStateError("Answer does not exist");

    answer.updateFeedback(feedbackEmoji, feedbackText);
  }

  public upsertAnswer(
    activity: Activity,
    questionId: number,
    answerDto: {
      text: string;
      id?: number;
    }
  ) {
    // TODO Se é só um item, pode ser find, não precisa de filter
    // e se não encontrar a question? erro.
    // rename de updateAnswer -> update

    const currentAnswer = this.answers.filter(
      (answ) => answ.id === answerDto.id && answ.questionId === question.id
    )[0];

    const question = activity?.lastVersion?.elements.filter(
      (quest) => quest.elementType === "Question" && quest.id === questionId
    )[0] as Question;

    if (currentAnswer)
      return currentAnswer.updateAnswer(answerDto.text, question.type);

    const newAnswer = StudentAnswerFactory.from(this, question, answerDto.text);

    this.answers.push(newAnswer);
  }

  public publishFeedback(userId: string) {
    if (userId !== this.activityAuthorId)
      throw new SilentInvalidStateError("User is not activity author");

    if (this.feedbackStatus === OutputStatus.Completed) {
      throw new SilentInvalidStateError("Feedback already published");
    }

    this.feedbackStatus = OutputStatus.Completed;
  }
}
