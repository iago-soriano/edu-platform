import { Languages } from "@edu-platform/common/domain/enums";

export function captalize(word: string) {
  return (
    word.charAt(0).toUpperCase() +
    word.slice(1).toLowerCase().replaceAll("_", " ")
  );
}

export function uncaptalize(word: string) {
  return word.toUpperCase().replaceAll(" ", "_");
}
