import Image from "next/image";
import { Languages } from "@edu-platform/common/domain/enums";
import usFlag from "../public/Flags/SVG/US.svg";
import itFlag from "../public/Flags/SVG/IT.svg";
import frFlag from "../public/Flags/SVG/FR.svg";
import deFlag from "../public/Flags/SVG/DE.svg";
import esFlag from "../public/Flags/SVG/ES.svg";
import brFlag from "../public/Flags/SVG/BR.svg";
import {
  BookOpenText,
  Clapperboard,
  LibraryBig,
  Volume1,
  Bike,
  NotebookText,
  Microscope,
  Drama,
  Landmark,
} from "lucide-react";

export function captalize(word: string) {
  return (
    word.charAt(0).toUpperCase() +
    word.slice(1).toLowerCase().replaceAll("_", " ")
  );
}

export function uncaptalize(word: string) {
  return word.toUpperCase().replaceAll(" ", "_");
}

export const flags = {
  English: <Image src={usFlag} alt="US flag" />,
  Italian: <Image src={itFlag} alt="IT flag" />,
  French: <Image src={frFlag} alt="FR flag" />,
  German: <Image src={deFlag} alt="DE flag" />,
  Spanish: <Image src={esFlag} alt="ES flag" />,
  Portuguese: <Image src={brFlag} alt="BR flag" />,
};

export const typesIcons = {
  Reading: <BookOpenText />,
  Listening: <Volume1 />,
};

export const topicsIcons = {
  Books: <LibraryBig />,
  Movies: <Clapperboard />,
  Sports: <Bike />,
  "Current affairs": <NotebookText />,
  "Science and technology": <Microscope />,
  Culture: <Drama />,
  Politics: <Landmark />,
};
