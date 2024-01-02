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

export const Track = ({ tracks, index, getPlayerCurrTime, videoDuration }) => {
  const { tracksBefore, thisTrack, tracksAfter } = splitTracks(tracks, index);
  const [start, setStart] = useState(thisTrack.split("-")[0]);
  const [end, setEnd] = useState(thisTrack.split("-")[1]);

  return (
    <div className="p-3 flex items-center">
      Assistir de
      <span>{start}</span> até <span>{end}</span>
    </div>
  );
};
