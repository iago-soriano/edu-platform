import {
  GhostInput,
  Spinner,
  errorToast,
  LibYoutubePlayer,
  YoutubePlayer,
} from "@components";
import { useRef, useState, useEffect, useCallback } from "react";
import { parseNumberToTimeLabel } from "@infrastructure";
import { AddTrackButton, Track } from "./tracks";
import {
  VideoContentResponsePayloadDTO,
  ContentTypes,
} from "@edu-platform/common/api";
import { CommmonContentProps } from "../types";

export const VideoContent = ({
  contentId,
  activityId,
  payload: { url: urlProps, tracks: tracksProps },
  saveContentMutation,
  onChange,
}: { payload: VideoContentResponsePayloadDTO } & CommmonContentProps) => {
  const [player, setPlayer] = useState<LibYoutubePlayer | null>(null);
  const [videoDuration, setVideoDuration] = useState<string>();
  const [tracks, setTracks] = useState(tracksProps);
  const [videoUrl, setVideoUrl] = useState(urlProps);

  const onBlurUrl = (e) => {
    const newUrl = e.target.value;
    if (newUrl === urlProps) return;
    setVideoUrl(newUrl?.split("&")[0]);

    saveContentMutation.mutate({
      activityId,
      payload: {
        video: {
          tracks: "-",
          url: newUrl,
        },
      },
      type: ContentTypes.Video,
      id: contentId,
    });

    onChange(false);
  };

  useEffect(() => {
    if (player) {
      const durationLabel = parseNumberToTimeLabel(player?.getDuration());
      setVideoDuration(durationLabel);
    }
  }, [videoUrl]);

  useEffect(() => {
    console.log(
      "current",
      tracks.split(",").length,
      "coming",
      tracksProps.split(",").length
    );
    if (tracks !== tracksProps) {
      saveContentMutation.mutate({
        activityId,
        payload: {
          video: {
            tracks,
          },
        },
        type: ContentTypes.Video,
        id: contentId,
      });
    }
  }, [tracks]);

  const getPlayerCurrTime = useCallback(() => {
    let currTime = 0;
    if (player) {
      try {
        currTime = Math.floor(player.getCurrentTime());
      } catch (ex) {
        console.error({ ex });
      }
    }
    return currTime;
  }, [player]);

  useEffect(() => {
    if (tracks === "-" && !!videoDuration) {
      setTracks(`00:00:00-${videoDuration}`);
    }
  }, [videoDuration]);

  useEffect(() => {
    console.log(
      "current",
      tracks.split(",").length,
      "coming",
      tracksProps.split(",").length
    );
    if (tracks !== tracksProps) setTracks(tracksProps);
  }, [tracksProps]);

  const onClickAddTrack = () => {
    if (!videoUrl) {
      errorToast("Favor inserir uma URL");
      return;
    }
    const tracksArray = tracks.split(",");
    const lastTrackEnd = tracksArray[tracksArray.length - 1].split("-")[1];
    setTracks((tracks) => `${tracks},${lastTrackEnd}-${videoDuration}`);
  };

  // const addTracksError = saveContentMutation.error?.errors?.["tracks"];

  return (
    <div>
      <GhostInput
        name="content"
        placeholder="URL do Youtube"
        className=""
        defaultValue={urlProps}
        onBlur={onBlurUrl}
        // error={saveContentMutation.error?.errors?.["url"]} // TODO: run validations on video url
        onChange={() => onChange(true)}
      />
      {tracks?.split(",").map((track, i) => (
        <Track
          key={`${i}-${track}`}
          index={i}
          tracks={tracks}
          setTracks={setTracks}
          disabled={false}
          getPlayerCurrTime={getPlayerCurrTime}
          videoDuration={videoDuration}
          // saveMutation={saveTracks}
          hasUrl={!!videoUrl}
        />
      ))}
      <AddTrackButton onClick={onClickAddTrack} />
      <div className="p-2 flex justify-center">
        <YoutubePlayer
          videoUrl={videoUrl || ""}
          setPlayer={setPlayer}
          setDuration={setVideoDuration}
          fallbackMessage="Insira uma URL do youtube acima"
        />
      </div>
    </div>
  );
};
