import { IUseCase } from "@interfaces";

type InputParams = void;

type Return = {
  topics: { id: number; label: string }[];
};

export type IGetTopicsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetTopicsUseCase {
  constructor() {}

  async execute() {
    return { topics: [{ id: 1, label: "massa" }] };
  }
}

export default UseCase;
