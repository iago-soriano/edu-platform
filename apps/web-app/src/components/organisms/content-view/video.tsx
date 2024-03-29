"use client";
import { useState } from "react";
import { LibYoutubePlayer, YoutubePlayer, TrackSeek } from "@components";

export const VideoContent = ({ url, tracks }) => {
  const [player, setPlayer] = useState<LibYoutubePlayer | null>(null);

  const isWatchWholeVideo =
    tracks.length === 0 ||
    tracks[tracks.length - 1].split("-")[1] === "00:00:00" ||
    !tracks[tracks.length - 1].split("-")[1];
  return (
    <div>
      {!isWatchWholeVideo ? (
        tracks.map((track, i) => (
          <TrackSeek key={`${i}-${track}`} track={tracks[i]} player={player} />
        ))
      ) : (
        <p>Assistir ao vídeo inteiro</p>
      )}
      <div className="p-2 flex justify-center">
        <YoutubePlayer
          videoUrl={url}
          setPlayer={setPlayer}
          fallbackMessage="Não há vídeo :/"
        />
      </div>
    </div>
  );
};
