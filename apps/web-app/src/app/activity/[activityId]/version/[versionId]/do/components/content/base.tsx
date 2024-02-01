import { VideoContent } from ".";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ContentContainer,
  TitleView,
  DescriptionView,
  ImageView,
} from "../../../common-components";

type BaseContentProps = {
  title?: string;
  description?: string;
  type: string;
  id: any;
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
        return <p className="">{text}</p>;
      case "Video":
        return <VideoContent url={videoUrl} tracks={tracks} />;
      case "Image":
        return <ImageView src={imageUrl} />;
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
      <ContentContainer>
        {title && <TitleView title={title} />}
        {description && <DescriptionView description={description} />}
        {getContent(type)}
      </ContentContainer>
    </div>
  );
};
