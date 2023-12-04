import { ActivityStatusNotFound, DomainRules } from "@edu-platform/common";

export const activityPossibleStatus = [
  "Draft",
  "Archived",
  "Published",
] as const;

export type ActivityStatusType = (typeof activityPossibleStatus)[number];

export class Activity {
  static validateTitle(title: string) {
    if (title.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new Error(
        `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (title.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH) {
      throw new Error(
        `Título da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  static validateDescription(description: string) {
    if (description.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH) {
      throw new Error(
        `Descrição da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (
      description.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH
    ) {
      throw new Error(
        `Descrição da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  static validateStatuses(activityStatuses: string[]) {
    const resp = [];
    const sanitizedDomain = activityPossibleStatus.map((st) =>
      st.toLowerCase()
    );

    for (let status of activityStatuses) {
      if (sanitizedDomain.includes(status.toLowerCase())) {
        resp.push(status);
      } else {
        throw new ActivityStatusNotFound({ status });
      }
    }

    return resp;
  }
}
