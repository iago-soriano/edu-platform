import { IUseCase, UserDTO } from "@interfaces";

type InputParams = void;

type Return = {
  topics: string[];
};

export type IGetTopicsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetTopicsUseCase {
  constructor() {}

  async execute() {
    return { topics: ["top", "massa"] };
  }
}

export default UseCase;
