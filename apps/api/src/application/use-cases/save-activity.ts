import { IUseCase, UserSelectDTO } from "@interfaces";

type InputParams = {
  title: string;
  description: string;
  topicIds: string[];
  user: UserSelectDTO;
};

type Return = {
  activityId: number;
};

export type ISaveActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveActivityUseCase {
  constructor() {}

  async execute({ title, description, topicIds }: InputParams) {
    return { activityId: 1 };
  }
}

export default UseCase;
