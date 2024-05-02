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
import {
  ContentResponseDTO,
  TextContentResponsePayloadDTO,
  VideoContentResponsePayloadDTO,
  ImageContentResponsePayloadDTO,
} from "@edu-platform/common/api";

type BaseContentProps = {
  contentDto: ContentResponseDTO;
};
export const BaseContent = ({ contentDto }: BaseContentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContent = (type: string) => {
    switch (type) {
      case "Text":
        return (
          <TextContentView>
            {(contentDto.payload as TextContentResponsePayloadDTO)?.text}
          </TextContentView>
        );
      case "Video":
        return (
          <VideoContent
            url={(contentDto.payload as VideoContentResponsePayloadDTO)?.url}
            tracks={(
              contentDto.payload as VideoContentResponsePayloadDTO
            )?.tracks?.split(",")}
          />
        );
      case "Image":
        return (
          <ImageView
            src={(contentDto.payload as ImageContentResponsePayloadDTO)?.url}
          />
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
