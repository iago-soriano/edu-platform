import { DomainRules } from "@edu-platform/common";

export class Activity {
  constructor(
    public title: string,
    public description: string,
    public topics: { label: string }[]
  ) {
    if (title) this._validateTitle();
    if (description) this._validateDescription();
    if (topics) this._validateTopics();
  }

  _validateTitle() {
    if (this.title.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new Error(
        `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (this.title.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH) {
      throw new Error(
        `Título da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  _validateDescription() {
    if (this.description.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH) {
      throw new Error(
        `Descrição da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    } else if (
      this.description.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH
    ) {
      throw new Error(
        `Descrição da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.ACTIVITY.TITLE.MAX_LENGTH} caracteres`
      );
    }
  }

  _validateTopics() {
    if (this.topics.length > DomainRules.ACTIVITY.TOPICS.MAX_COUNT) {
      throw new Error(
        `Favor escolher até ${DomainRules.ACTIVITY.TOPICS.MAX_COUNT} tópicos.`
      );
    }
  }
}
