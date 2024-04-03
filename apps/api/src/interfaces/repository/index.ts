export * from "./activities";
export * from "./dtos";
export * from "./tokens";
export * from "./users";
export * from "./collections";
export * from "./collection-participation";
export * from "./student-outputs";
export * from "./student-answers";
export * from "./notifications";

export interface IChangeEvent {
  entityId?: string | number;
  type: string;
  payload: unknown;
}
