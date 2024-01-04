// import { toThrowFieldError } from './../../../test/jest/matchers/custom-error';
import { Content } from ".";
import { DomainRules } from "@edu-platform/common";
import "../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";

describe("Unit tests for base Content domain entity", () => {
  it("Should validate if title is too long", () => {
    const title =
      "Título muito enormeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    expect(() => Content.validateTitle(title)).toThrowFieldError(
      "title",
      `Título é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
    );
  });

  it("Should validate if title is too short", () => {
    const title = "Ai";
    expect(() => Content.validateTitle(title)).toThrowFieldError(
      "title",
      `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`
    );
  });

  it("Should validate if description is too long", () => {
    const description =
      "descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo";

    expect(() => Content.validateDescription(description)).toThrowFieldError(
      "description",
      `Descrição é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`
    );
  });

  it("Should validate if description is too short", () => {
    const description = "desc";

    expect(() => Content.validateDescription(description)).toThrowFieldError(
      "description",
      `Descrição é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH} caracteres`
    );
  });

  it("Should validate if content type is invalid", () => {
    const type = "fsdfsd";

    expect(() => Content.validateContentType(type)).toThrow(
      "Tipo de conteúdo não encontrado"
    );
  });

  it.todo(
    "Should create content of correct type with its properties",
    () => {}
  );
});
