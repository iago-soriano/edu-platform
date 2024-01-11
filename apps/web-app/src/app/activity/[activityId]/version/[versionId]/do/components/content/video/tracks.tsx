import { parseTimeToNumber, parseNumberToTimeLabel } from "@infrastructure";
import { useEffect, useState } from "react";
import { Icons, errorToast } from "@components";

const splitTracks = (tracks: string, index: number) => {
  const tracksSplit = tracks.split(",");
  const tracksBefore = tracksSplit.slice(0, index);
  const tracksAfter = tracksSplit.slice(index + 1);
  const thisTrack = tracksSplit[index];

  return { tracksBefore, thisTrack, tracksAfter };
};

export const Track = ({ track, index, getPlayerCurrTime, videoDuration }) => {
  const [start, setStart] = useState(track.split("-")[0]);
  const [end, setEnd] = useState(track.split("-")[1]);

  return (
    <div className="p-3 flex items-center">
      <Icons.PLAY size={25} className="text-accent mx-2" />
      Assistir de
      <span>{start}</span> até <span>{end}</span>
    </div>
  );
};
