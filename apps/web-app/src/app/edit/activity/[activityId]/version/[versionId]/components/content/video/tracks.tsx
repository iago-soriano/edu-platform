import { parseTimeToNumber, parseNumberToTimeLabel } from "@infrastructure";
import { useState } from "react";

const NowButton = ({ onClick, disabled }) => {
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
const TimeInput = ({ max, onChange, onBlur, value, disabled }) => {
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

export const Track = ({
  tracks,
  disabled,
  index,
  setTracks,
  getPlayerCurrTime,
  videoDuration,
}) => {
  // console.log(tracks);
  const [start, setStart] = useState(tracks.split(",")[index].split("-")[0]);
  const [end, setEnd] = useState(tracks.split(",")[index].split("-")[1]);
  // console.log(start, end);
  // const [start, end] = ;
  const onNowClickEnd = async () => {
    const currTimeLabel = parseNumberToTimeLabel(getPlayerCurrTime());
    setEnd(currTimeLabel);
    setTracks((tracks) => {
      const tracksSplit = tracks.split(",");
      const tracksBefore = tracksSplit.slice(0, index);
      const tracksAfter = tracksSplit.slice(index + 1);
      const thisTrack = `${tracksSplit[index].split("-")[0]}-${currTimeLabel}`;
      return [...tracksBefore, thisTrack, ...tracksAfter].join(",");
    });
  };
  const onNowClickStart = () => {
    const currTimeLabel = parseNumberToTimeLabel(getPlayerCurrTime());
    setStart(currTimeLabel);
    setTracks((tracks) => {
      const tracksSplit = tracks.split(",");
      const tracksBefore = tracksSplit.slice(0, index);
      const tracksAfter = tracksSplit.slice(index + 1);
      const thisTrack = `${currTimeLabel}-${tracksSplit[index].split("-")[1]}`;
      return [...tracksBefore, thisTrack, ...tracksAfter].join(",");
    });
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
    <div>
      <label>
        Início{" "}
        <TimeInput
          max={videoDuration}
          value={start}
          // onChange={onChangeStart}
          // onBlur={onSaveStartTime}
          onChange={(e) => setStart(e.target.value)}
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
          onChange={(e) => setEnd(e.target.value)}
          onBlur={() => {}}
          disabled={disabled}
        />
        <NowButton disabled={disabled} onClick={onNowClickEnd} />
      </label>
      <button onClick={onClickRemoveTrack}>X</button>
    </div>
  );
};

export const AddTrackButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => <button {...props}>Adicionar Faixa</button>;
