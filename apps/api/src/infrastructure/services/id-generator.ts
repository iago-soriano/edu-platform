import { v4 as uuidv4 } from "uuid";
import { IIdGenerator } from "@interfaces";

export class IdGeneratorService implements IIdGenerator {
  getId() {
    return uuidv4();
  }
}
