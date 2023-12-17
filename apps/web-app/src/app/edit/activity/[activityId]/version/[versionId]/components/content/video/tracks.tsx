import { parseTimeToNumber, parseNumberToTimeLabel } from "@infrastructure";
import { useState } from "react";
import { Icons } from "@components";

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
  <button className="text-error rounded border p-3 hover:bg-surface3 hover:opacity-50 hover:border-black hover:shadow-hover hover:font-bold">
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
  saveMutation,
}) => {
  const { tracksBefore, thisTrack, tracksAfter } = splitTracks(tracks, index);
  const [start, setStart] = useState(thisTrack.split("-")[0]);
  const [end, setEnd] = useState(thisTrack.split("-")[1]);

  const onNowClickEnd = async () => {
    const currTimeLabel = parseNumberToTimeLabel(getPlayerCurrTime());
    setEnd(currTimeLabel);
    const newTracks = [
      ...tracksBefore,
      `${thisTrack.split("-")[0]}-${currTimeLabel}`,
      ...tracksAfter,
    ].join(",");
    setTracks(newTracks);
    saveMutation(newTracks);
  };

  const onNowClickStart = () => {
    const currTimeLabel = parseNumberToTimeLabel(getPlayerCurrTime());
    setStart(currTimeLabel);
    const newTracks = [
      ...tracksBefore,
      `${currTimeLabel}-${thisTrack.split("-")[1]}`,
      ...tracksAfter,
    ].join(",");
    setTracks(newTracks);
    saveMutation(newTracks);
  };

  const onClickRemoveTrack = () => {
    console.log(index);
    console.log(
      tracks
        .split(",")
        .filter((_, i) => i !== index)
        .join(",")
    );
    // const newTracks = tracks
    setTracks((tracks) =>
      tracks
        .split(",")
        .filter((_, i) => i !== index)
        .join(",")
    );
  };
  return (
    <div className="p-3 flex items-center">
      <label>
        Início{" "}
        <TimeInput
          max={videoDuration}
          value={start}
          // onChange={onChangeStart}
          // onBlur={onSaveStartTime}
          onChange={(e) => setStart((e.target as any).value)}
          onBlur={() => {}}
          disabled={disabled}
        />
        <NowButton disabled={disabled} onClick={onNowClickStart} />
      </label>
      <label>
        Fim{" "}
        <TimeInput
          max={videoDuration}
          value={end}
          // onChange={onChangeEnd}
          // onBlur={onSaveEndTime}
          onChange={(e) => setEnd((e.target as any).value)}
          onBlur={() => {}}
          disabled={disabled}
        />
        <NowButton disabled={disabled} onClick={onNowClickEnd} />
      </label>
      <RemoveButton onClick={onClickRemoveTrack} />
    </div>
  );
};
