import { parseTimeToNumber } from "@infrastructure";
import { Icons, LibYoutubePlayer } from "@components";

export const TrackSeek = ({
  track,
  player,
}: {
  track: string;
  player: LibYoutubePlayer | null;
}) => {
  const start = track.split("-")[0];
  const end = track.split("-")[1];

  return (
    <div className="p-3 flex items-center">
      <Icons.PLAY
        onClick={() => {
          player?.seekTo(parseTimeToNumber(start));
        }}
        size={25}
        className="text-accent mx-2 cursor-pointer"
      />
      Assistir de <span className="mx-1">{start}</span> até{" "}
      <span className="mx-1">{end}</span>
    </div>
  );
};
