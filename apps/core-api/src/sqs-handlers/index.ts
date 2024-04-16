import {
  IActivityPublishedUseCase,
  IFeedbackPublishedUseCase,
  IStudentOutputPublishedUseCase,
  IUserCreatedUseCase,
} from "@application/use-cases";

export class SqsHandler {
  constructor(
    private activityPublishedUseCase: IActivityPublishedUseCase,
    private feedbackPublishedUseCase: IFeedbackPublishedUseCase,
    private studentOutputPublishedUseCase: IStudentOutputPublishedUseCase,
    private userCreatedUseCase: IUserCreatedUseCase
  ) {}
  execute(evnt: any) {
    console.log(evnt);
  }
}
