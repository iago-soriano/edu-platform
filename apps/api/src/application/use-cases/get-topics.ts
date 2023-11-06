import { ITopicsRepository, IUseCase } from "@interfaces";

type InputParams = void;

type Return = {
  topics: { id: number; createdAt: Date; updatedAt: Date; label: string }[];
};

export type IGetTopicsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetTopicsUseCase {
  constructor(private topicsRepository: ITopicsRepository) {}

  async execute() {
    const topics = await this.topicsRepository.getAllTopics();
    return { topics };
  }
}

export default UseCase;
