"use client";
import { useState } from "react";
import { LibYoutubePlayer, YoutubePlayer } from "./YoutubePlayer";

export const VideoContent = ({ url }) => {
  const [player, setPlayer] = useState<LibYoutubePlayer | null>(null);

  return (
    <div className="flex justify-center">
      <YoutubePlayer
        videoUrl={url}
        setPlayer={setPlayer}
        fallbackMessage="Não há vídeo :/"
      />
    </div>
  );
};
