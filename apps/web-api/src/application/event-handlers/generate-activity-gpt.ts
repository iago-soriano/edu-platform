import { IUseCase } from '@edu-platform/common/platform';
import { GenerateActivityGPTEvent } from '@edu-platform/common/domain/integration-events';

export type IActivityGeneratedUseCase = IUseCase<
  GenerateActivityGPTEvent,
  void
>;

class UseCase implements IActivityGeneratedUseCase {
  constructor() {}

  async execute(args: GenerateActivityGPTEvent) {}
}
export default UseCase;
