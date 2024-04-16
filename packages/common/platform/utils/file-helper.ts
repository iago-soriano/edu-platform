import { FileType } from "@edu-platform/common";

export const getFileExtension = (file: FileType | null) =>
  file?.mimetype.split("/")[1];
