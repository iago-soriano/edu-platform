import { GhostInput, Spinner, errorToast } from "@components";
import { useRef, useState, useEffect, useCallback } from "react";
import { LibYoutubePlayer, YoutubePlayer } from "./player";
import {
  parseTimeToNumber,
  parseNumberToTimeLabel,
  useMediaQuery,
} from "@infrastructure";
import { AddTrackButton, Track } from "./tracks";
import { VideoContentPayloadDTO, ContentTypes } from "@edu-platform/common";
import { CommmonContentProps } from "../types";

export const VideoContent = (
  {
    contentId,
    payload: { url, tracks: tracksProps },
    saveContentMutation,
    onChange,
    hasChanges,
  }: { payload: VideoContentPayloadDTO } & CommmonContentProps
  // : {saveContentMutation: UseMutationResult<SaveContentResponseBody, ServerError, SaveContentRequestBody, unknown>}
) => {
  const [player, setPlayer] = useState<LibYoutubePlayer>(null);
  const [videoDuration, setVideoDuration] = useState<string>();
  const [tracks, setTracks] = useState(tracksProps || "-");
  const [videoUrl, setVideoUrl] = useState(url);

  const onBlurUrl = (e) => {
    const newUrl = e.target.value;
    if (newUrl === url) return;

    saveContentMutation.mutate({
      payload: {
        video: {
          tracks,
          url: newUrl,
        },
      },
      type: ContentTypes.Video,
      id: contentId,
    });

    //TODO: verificar
    //onChange(false);
  };

  useEffect(() => {
    if (player) {
      const durationLabel = parseNumberToTimeLabel(player?.getDuration());
      setVideoDuration(durationLabel);
    }
  }, [player]);

  useEffect(() => {
    saveContentMutation.mutate({
      payload: {
        video: {
          tracks,
          url: videoUrl,
        },
      },
      type: ContentTypes.Video,
      id: contentId,
    });
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
    setVideoUrl(url?.split("&")[0]);
  }, [url]);

  useEffect(() => {
    if (tracks === "-" && !!videoDuration) {
      setTracks(`00:00:00-${videoDuration}`);
    }
  }, [videoDuration]);

  const onClickAddTrack = () => {
    if (!videoUrl) {
      errorToast("Favor inserir uma URL");
      return;
    }
    const tracksArray = tracks.split(",");
    if (tracksArray.length >= 10) {
      errorToast("Não se pode adicionar mais de 10 faixas");
      return;
    }
    const lastTrackEnd = tracksArray[tracksArray.length - 1].split("-")[1];
    setTracks((tracks) => `${tracks},${lastTrackEnd}-${videoDuration}`);
  };

  return (
    <div>
      <GhostInput
        name="content"
        placeholder="URL do Youtube"
        className=""
        defaultValue={url}
        onBlur={onBlurUrl}
        error={saveContentMutation.error?.errors?.["content"]}
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
          videoUrl={videoUrl}
          player={player}
          setPlayer={setPlayer}
        />
        {/* {videoUrl ? (
            
          ) : (
            <h6>Insira uma URL e o video aparecerá aqui</h6>
          )}
        </div>  */}
      </div>
    </div>
  );
};
