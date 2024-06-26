import { ISaveContentUseCase, SaveContentUseCase } from "@use-cases";
import { AbstractMockBuilder } from "../abstract";
import {
  ActivityRepositoryMockBuilder,
  IdGeneratorMockBuilder,
  S3ServiceMockBuilder,
  GetActivityMiddlewareMockBuilder,
} from "../..";

export class SaveContentUseCaseMockBuilder extends AbstractMockBuilder<SaveContentUseCase> {
  public activityRepositoryMockBuilder!: ActivityRepositoryMockBuilder;
  public idGeneratorMockBuilder!: IdGeneratorMockBuilder;
  public s3ServiceMockBuilder!: S3ServiceMockBuilder;
  public getActivityMiddlewareMockBuilder!: GetActivityMiddlewareMockBuilder;

  constructor() {
    super();

    this.activityRepositoryMockBuilder = new ActivityRepositoryMockBuilder();
    this.idGeneratorMockBuilder = new IdGeneratorMockBuilder();
    this.s3ServiceMockBuilder = new S3ServiceMockBuilder();
    this.getActivityMiddlewareMockBuilder =
      new GetActivityMiddlewareMockBuilder();

    this.reset();
  }

  reset() {
    this.activityRepositoryMockBuilder.reset();
    this.s3ServiceMockBuilder.reset();
    this.idGeneratorMockBuilder.reset();
    this.getActivityMiddlewareMockBuilder.reset();

    this.object = new SaveContentUseCase(
      this.activityRepositoryMockBuilder.object,
      this.s3ServiceMockBuilder.object,
      this.idGeneratorMockBuilder.object,
      this.getActivityMiddlewareMockBuilder.object
    );
  }

  refresh() {
    this.object = new SaveContentUseCase(
      this.activityRepositoryMockBuilder.object,
      this.s3ServiceMockBuilder.object,
      this.idGeneratorMockBuilder.object,
      this.getActivityMiddlewareMockBuilder.object
    );
  }
}
