import { parseTimeToNumber, parseNumberToTimeLabel } from "@infrastructure";
import { useEffect, useState } from "react";
import { Icons, errorToast } from "@components";

const NowButton = ({
  onClick,
  disabled,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      className="p-2 rounded border mx-2"
      onClick={onClick}
    >
      Momento atual
    </button>
  );
};

const TimeInput = ({
  max,
  onChange,
  onBlur,
  value,
  disabled,
}: React.ButtonHTMLAttributes<HTMLInputElement> & { max: string }) => {
  return (
    <input
      className="p-2 bg-surface3 invalid:border invalid:border-error rounded"
      name="start"
      type="time"
      step={1}
      min="00:00:00"
      max={max}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};

const RemoveButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="text-error rounded border p-3 hover:bg-surface3 hover:opacity-50 hover:border-black hover:shadow-hover hover:font-bold"
  >
    <Icons.X />
  </button>
);

export const AddTrackButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => (
  <button className="flex items-center p-3 rounded border" {...props}>
    <Icons.PLUS /> Nova Faixa
  </button>
);

const splitTracks = (tracks: string, index: number) => {
  const tracksSplit = tracks.split(",");
  const tracksBefore = tracksSplit.slice(0, index);
  const tracksAfter = tracksSplit.slice(index + 1);
  const thisTrack = tracksSplit[index];

  return { tracksBefore, thisTrack, tracksAfter };
};

export const Track = ({
  tracks,
  disabled,
  index,
  setTracks,
  getPlayerCurrTime,
  videoDuration,
  // saveMutation,
  hasUrl,
}) => {
  const { tracksBefore, thisTrack, tracksAfter } = splitTracks(tracks, index);
  const [start, setStart] = useState(thisTrack.split("-")[0]);
  const [end, setEnd] = useState(thisTrack.split("-")[1]);

  const onNowClickEnd = () => {
    if (!hasUrl) {
      errorToast("Favor inserir uma URL");
      return;
    }

    const currEnd = parseNumberToTimeLabel(getPlayerCurrTime());

    setEnd(currEnd);
    setCurrentTrackTo("", currEnd);
  };

  const onNowClickStart = () => {
    if (!hasUrl) {
      errorToast("Favor inserir uma URL");
      return;
    }

    const currStart = parseNumberToTimeLabel(getPlayerCurrTime());

    setStart(currStart);
    setCurrentTrackTo(currStart, "");
  };

  const onClickRemoveTrack = () => {
    const newTracks = tracks
      .split(",")
      .filter((_, i) => i !== index)
      .join(",");
    if (newTracks !== tracks) {
      setTracks(newTracks);
    }
  };

  const setCurrentTrackTo = (newStart: string, newEnd: string) => {
    const newTracks = [
      ...tracksBefore,
      `${newStart || start}-${newEnd || end}`,
      ...tracksAfter,
    ].join(",");
    setTracks(newTracks);
  };

  return (
    <div className="p-3 flex items-center">
      <label>
        Início{" "}
        <TimeInput
          max={videoDuration}
          value={start}
          onChange={(e) => setStart((e.target as any).value)}
          onBlur={() => setCurrentTrackTo("", "")}
          disabled={disabled}
        />
        <NowButton disabled={disabled} onClick={onNowClickStart} />
      </label>
      <label>
        Fim{" "}
        <TimeInput
          max={videoDuration}
          value={end}
          onChange={(e) => setEnd((e.target as any).value)}
          onBlur={() => setCurrentTrackTo("", "")}
          disabled={disabled}
        />
        <NowButton disabled={disabled} onClick={onNowClickEnd} />
      </label>
      <RemoveButton onClick={onClickRemoveTrack} />
    </div>
  );
};
