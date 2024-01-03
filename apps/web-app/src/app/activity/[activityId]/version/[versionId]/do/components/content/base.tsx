import {
  GhostInput,
  GhostTextArea,
  ErrorCard,
  Icons,
  ButtonWithDropdown,
} from "@components";
import { VideoContent } from ".";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  useSaveContentMutation,
  useDeleteActivityContentMutation,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";

type BaseContentProps = {
  title?: string;
  description?: string;
  type: string;
  id: string;
  activityId: string;
  versionId: string;
  videoUrl?: string;
  tracks?: string;
  imageUrl?: string;
  text?: string;
};
export const BaseContent = ({
  title,
  description,
  videoUrl,
  imageUrl,
  text,
  tracks,
  type,
  id: contentId,
  activityId,
  versionId,
}: BaseContentProps) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getContent = (type: string) => {
    switch (type) {
      case "Text":
        return <p className="min-h-[200px]">{text}</p>;
      case "Video":
        return <VideoContent url={videoUrl} tracks={tracks} />;
      case "Image":
        return (
          <div
            className={`w-[550px] h-[550px] flex justify-center items-center mx-auto my-3`}
          >
            <img src={imageUrl} className="max-w-[550px] max-h-[550px]" />
          </div>
        );
    }
  };

  return (
    <div
      className={twMerge(
        "grid sm:grid-cols-10 grid-cols-16p-2",
        isFocused ? "bg-surface3" : ""
      )}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    >
      <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        {title && <h4 className="text-xl leading-10 font-bold">{title}</h4>}
        {description && <p className="text-text2">{description}</p>}
        {getContent(type)}
      </div>
    </div>
  );
};
