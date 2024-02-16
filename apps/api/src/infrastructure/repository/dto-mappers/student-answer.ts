/* import {
  StudentAnswerRequestDTO,
  StudentAnswerResponseDTO,
  CollectionRequestDTO,
  CollectionResponseDTO,
} from "@edu-platform/common";
import { Collection, StudentAnswer, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { QuestionSelectDTO, UserSelectDTO } from "@interfaces";

export const StudentAnswerDtoMapper: DomainDtoMapper<
  StudentAnswer,
  StudentAnswerRequestDTO,
  StudentAnswerResponseDTO
> = {
  mapFromDto: (dto: StudentAnswerRequestDTO, user: UserSelectDTO, question: QuestionSelectDTO) => {
    const answer = new StudentAnswer();

    return answer;
  },

  mapToDto: (domain: StudentAnswer) => {
    const dto: StudentAnswerResponseDTO = {
      id: domain.id || 0,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      name: domain.name,
      description: domain.description,
      ownerId: domain.owner.id || 0,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
 */
