import { FileType } from "@interfaces";

export const getFileExtension = (file: FileType | null) =>
  file?.mimetype.split("/")[1];
