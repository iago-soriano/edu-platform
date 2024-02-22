import LibYoutubePlayer from "react-player/youtube";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import dynamic from "next/dynamic";
import { useMediaQuery, parseNumberToTimeLabel } from "@infrastructure";
import { Spinner } from "@components";

interface YoutubePlayerProps {
  setDuration?: (args: string) => any;
  setPlayer: React.SetStateAction<any>;
  videoUrl: string;
  fallbackMessage: string;
}
export const YoutubePlayer = ({
  setDuration,
  setPlayer,
  videoUrl,
  fallbackMessage,
}: YoutubePlayerProps) => {
  const isMore900 = useMediaQuery("(min-width: 900px)");
  const isMore590 = useMediaQuery("(min-width: 590px)");

  const playerWidth = isMore900 ? 800 : isMore590 ? 501 : 300;
  const playerHeight = isMore900 ? 450 : 282;

  return (
    <div style={{ width: playerWidth, height: playerHeight }}>
      {videoUrl ? (
        <ReactPlayer
          onReady={(e) => {
            setPlayer(e["player"]);
            setDuration(parseNumberToTimeLabel(e["player"]?.getDuration()));
          }}
          url={videoUrl}
          width={playerWidth}
          height={playerHeight}
          config={{
            youtube: {
              playerVars: {
                origin: "http://localhost:3000",
                host: "https://www.youtube.com",
              },
            },
          }}
          fallback={
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-[50%] w-[50%]">
                <Spinner />
              </div>
            </div>
          }
          controls
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h6>{fallbackMessage}</h6>
        </div>
      )}
    </div>
  );
};

export type { LibYoutubePlayer };
