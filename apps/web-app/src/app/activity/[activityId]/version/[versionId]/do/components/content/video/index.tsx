import { GhostInput, Spinner, errorToast } from "@components";
import { useRef, useState, useEffect, useCallback } from "react";
import { LibYoutubePlayer, YoutubePlayer } from "./player";
import {
  parseTimeToNumber,
  parseNumberToTimeLabel,
  useMediaQuery,
} from "@infrastructure";
import { Track } from "./tracks";

export const VideoContent = (
  { url, tracks: tracksProps }
  // : {saveContentMutation: UseMutationResult<SaveContentResponseBody, ServerError, SaveContentRequestBody, unknown>}
) => {
  const [player, setPlayer] = useState<LibYoutubePlayer>(null);
  const [videoDuration, setVideoDuration] = useState<string>();
  const [tracks, setTracks] = useState(tracksProps || "-");

  useEffect(() => {
    if (player) {
      const durationLabel = parseNumberToTimeLabel(player?.getDuration());
      setVideoDuration(durationLabel);
    }
  }, [player]);

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

  return (
    <div>
      {tracks
        ?.split(",")
        .map((track, i) => (
          <Track
            key={`${i}-${track}`}
            index={i}
            tracks={tracks}
            getPlayerCurrTime={getPlayerCurrTime}
            videoDuration={videoDuration}
          />
        ))}
      <div className="p-2 flex justify-center">
        <YoutubePlayer videoUrl={url} player={player} setPlayer={setPlayer} />
      </div>
    </div>
  );
};
