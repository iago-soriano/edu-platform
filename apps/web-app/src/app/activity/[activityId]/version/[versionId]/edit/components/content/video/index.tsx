import { GhostInput, Spinner, errorToast } from "@components";
import { useRef, useState, useEffect, useCallback } from "react";
import { LibYoutubePlayer, YoutubePlayer } from "./player";
import { parseNumberToTimeLabel } from "@infrastructure";
import { AddTrackButton, Track } from "./tracks";
import {
  VideoContentPayloadDTO,
  ContentTypes,
  DomainRules,
} from "@edu-platform/common";
import { CommmonContentProps } from "../types";

export const VideoContent = ({
  order,
  contentId,
  payload: { url: urlProps, tracks: tracksProps },
  saveContentMutation,
  onChange,
  hasChanges,
}: { payload: VideoContentPayloadDTO } & CommmonContentProps) => {
  const [player, setPlayer] = useState<LibYoutubePlayer>(null);
  const [videoDuration, setVideoDuration] = useState<string>();
  const [tracks, setTracks] = useState(tracksProps || "-");
  const [videoUrl, setVideoUrl] = useState(urlProps);

  const onBlurUrl = (e) => {
    const newUrl = e.target.value;
    if (newUrl === urlProps) return;
    setVideoUrl(newUrl?.split("&")[0]);

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

    onChange(false);
  };

  useEffect(() => {
    if (player) {
      const durationLabel = parseNumberToTimeLabel(player?.getDuration());
      setVideoDuration(durationLabel);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (tracks !== tracksProps) {
      saveContentMutation.mutate({
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

  const onClickAddTrack = () => {
    if (!videoUrl) {
      errorToast("Favor inserir uma URL");
      return;
    }
    const tracksArray = tracks.split(",");
    // if (tracksArray.length >= DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM) {
    //   errorToast(
    //     `Não se pode adicionar mais de ${DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM} faixas`
    //   );
    //   return;
    // }
    const lastTrackEnd = tracksArray[tracksArray.length - 1].split("-")[1];
    setTracks((tracks) => `${tracks},${lastTrackEnd}-${videoDuration}`);
  };

  const addTracksError = saveContentMutation.error?.errors?.["tracks"];

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
      <div className={addTracksError && "border-error border-2"}>
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
      </div>
      {addTracksError && <p className="text-error mb-2">{addTracksError}</p>}
      <AddTrackButton onClick={onClickAddTrack} disabled={!!addTracksError} />
      <div className="p-2 flex justify-center">
        <YoutubePlayer
          videoUrl={videoUrl}
          setPlayer={setPlayer}
          setDuration={setVideoDuration}
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
