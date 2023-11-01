import { IUseCase, UserDTO, TopicDTO } from "@interfaces";

type InputParams = {
  title: string;
  description: string;
  topics: TopicDTO[];
  user: UserDTO;
};

type Return = {
  activityId: number;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor() {}

  async execute({ title, description, topics }: InputParams) {
    return { activityId: 2 };
  }
}

export default UseCase;
