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
  versionId: string;
};
export const BaseContent = ({
  contentDto,
  activityId,
  versionId,
}: BaseContentProps) => {
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
        {(!!contentDto.title || !!contentDto.description) && (
          <div>
            {contentDto.title && <TitleView title={contentDto.title} />}
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
