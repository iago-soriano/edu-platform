import { Answer } from 'domain/entities/answers';
import { answers } from '../schema';
import {
  ChangeEventsTree,
  ChangeTrackingProxy,
} from '@edu-platform/common/platform';

export class AnswersSerializer {
  static serialize = (domain: Answer) => {
    const dto: typeof answers.$inferInsert = {
      id: domain.id,
      blockId: domain.blockId,
      answer: domain.answer,
      review: domain.review,
    };

    return dto;
  };

  static deserialize(dto: typeof answers.$inferSelect) {
    const answer = new Answer();

    answer.id = dto.id;
    answer.blockId = dto.blockId!;
    answer.answer = dto.answer!;
    answer.review = dto.review!;

    const proxiedEntity = new ChangeTrackingProxy(answer) as Answer;

    return proxiedEntity;
  }
}
