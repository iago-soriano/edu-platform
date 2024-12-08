import { IUseCase } from "@edu-platform/common/platform";
import { IActivitiesRepository } from "application/interfaces";

type InputParams = {};

type Return = void;

export type IUpdateMyActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateMyActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({}: InputParams) {}
}
export default UseCase;
