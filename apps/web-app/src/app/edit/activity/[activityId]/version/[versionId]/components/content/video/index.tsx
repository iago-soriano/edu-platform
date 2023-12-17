import { GhostInput, errorToast } from "@components";
import { useRef, useState, useEffect, useCallback } from "react";
// import YouTube from "react-youtube";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import YoutubePlayer from "react-player/youtube";
import {
  parseTimeToNumber,
  parseNumberToTimeLabel,
  useMediaQuery,
} from "@infrastructure";
import { AddTrackButton, Track } from "./tracks";
import dynamic from "next/dynamic";

export const VideoContent = ({
  contentId,
  content,
  start,
  end,
  saveContentMutation,
  onChange,
  hasChanges,
}) => {
  // const playerRef = useRef<YoutubePlayer>();
  const [player, setPlayer] = useState<YoutubePlayer>(null);
  const [videoDuration, setVideoDuration] = useState("01:00:00");
  const [tracks, setTracks] = useState("00:00:00-00:00:00");
  // const [startLabel, setStartLabel] = useState(parseNumberToTimeLabel(start));
  // const [endLabel, setEndLabel] = useState(parseNumberToTimeLabel(end));
  const [videoUrl, setVideoUrl] = useState("");

  const onBlurUrl = (e) => {
    saveContentMutation.mutate({
      content: e.target.value,
      type: "Video",
      contentId,
    });
  };

  const isMore900 = useMediaQuery("(min-width: 900px)");
  const isMore590 = useMediaQuery("(min-width: 590px)");

  useEffect(() => {
    if (player) {
      const durationLabel = parseNumberToTimeLabel(player?.getDuration());
      setVideoDuration(durationLabel);
      setTracks(`00:00:00-${durationLabel}`);
      console.log(durationLabel);
    }
  }, [player]);

  const saveTracks = useCallback(() => {
    saveContentMutation.mutate({
      tracks,
      type: "Video",
      contentId,
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
    setVideoUrl(content.split("&")[0]);
  }, [content]);

  const onClickAddTrack = () => {
    setTracks((tracks) => `${tracks},00:00:00-${videoDuration}`);
  };

  return (
    <div>
      <GhostInput
        name="content"
        placeholder="URL do Youtube"
        className=""
        defaultValue={content}
        onBlur={onBlurUrl}
        error={saveContentMutation.error?.errors?.["content"]}
        onChange={() => onChange(true)}
      />
      {tracks.split(",").map((track, i) => (
        <Track
          key={`${i}-${track}`}
          index={i}
          tracks={tracks}
          setTracks={setTracks}
          disabled={false}
          getPlayerCurrTime={getPlayerCurrTime}
          videoDuration={videoDuration}
          saveMutation={saveTracks}
        />
      ))}
      <AddTrackButton onClick={onClickAddTrack} />
      <div className="p-2 flex justify-center">
        <ReactPlayer
          onReady={(e) => setPlayer(e["player"])}
          url={videoUrl}
          className="w-5"
          style={{}}
          width={isMore900 ? 800 : isMore590 ? 501 : 300}
          height={isMore900 ? 450 : 282}
          config={{
            youtube: {
              playerVars: {
                origin: "http://localhost:3000",
                host: "https://www.youtube.com",
              },
            },
          }}
          controls
        />
      </div>
    </div>
  );
};
