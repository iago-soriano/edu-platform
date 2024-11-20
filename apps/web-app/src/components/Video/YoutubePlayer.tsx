import LibYoutubePlayer from "react-player/youtube";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import dynamic from "next/dynamic";
import { useMediaQuery, parseNumberToTimeLabel } from "@infrastructure";
import { Spinner } from "../ui/spinner";

interface YoutubePlayerProps {
  videoUrl: string;
  fallbackMessage: string;
  setPlayer: React.SetStateAction<any>;
}
export const YoutubePlayer = ({
  videoUrl,
  fallbackMessage,
  setPlayer,
}: YoutubePlayerProps) => {
  const isLarge = useMediaQuery("(min-width: 1600px)");
  const isMedium = useMediaQuery("(min-width: 768px)");
  const isSmall = useMediaQuery("(min-width: 640px)");

  const playerStyle = {
    width: isLarge ? "80%" : isMedium ? "70%" : isSmall ? "90%" : "100%",
    maxWidth: isLarge ? 700 : isMedium ? 501 : 300,
    height: "auto",
    aspectRatio: "16/9",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      {videoUrl ? (
        /*  <ReactPlayer
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
        /> */
        <ReactPlayer
          url={
            "https://www.youtube.com/watch?v=P-WNLRsLlvE&ab_channel=DarrenMcGrady"
          }
          onReady={(e) => {
            setPlayer(e["player"]);
          }}
          style={playerStyle}
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
