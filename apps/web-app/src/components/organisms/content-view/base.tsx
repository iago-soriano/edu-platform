"use client";

import { VideoContent } from ".";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ContentContainer,
  TitleView,
  DescriptionView,
  ImageView,
  TextContentView,
} from ".";
import { ContentResponseDTO } from "@edu-platform/common";

type BaseContentProps = {
  contentDto: ContentResponseDTO;
  activityId: string;
};
export const BaseContent = ({ contentDto }: BaseContentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContent = (type: string) => {
    switch (type) {
      case "Text":
        return (
          <TextContentView>{contentDto.payload?.text?.text}</TextContentView>
        );
      case "Video":
        return (
          <VideoContent
            url={contentDto.payload?.video?.url}
            tracks={contentDto.payload?.video?.tracks?.split(",")}
          />
        );
      case "Image":
        return <ImageView src={contentDto.payload?.image?.url} />;
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
        {!!contentDto.description && (
          <div>
            {contentDto.description && (
              <DescriptionView description={contentDto.description} />
            )}
            <br />
          </div>
        )}

        {getContent(contentDto.type)}
      </ContentContainer>
    </div>
  );
};
