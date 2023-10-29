import { IUseCase, UserDTO } from "@interfaces";

type InputParams = {
  title: string;
  description: string;
  topics: string[];
  user: UserDTO;
};

type Return = {
  activityId: number;
};

export type IInsertActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertActivityUseCase {
  constructor() {}

  async execute({ title, description, topics }: InputParams) {
    return { activityId: 1 };
  }
}

export default UseCase;
