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
  const isLarge = useMediaQuery("(min-width: 1536px)");

  const playerStyle = {
    margin: "0 auto",
    maxWidth: isLarge ? "80%" : "100%",
    aspectRatio: "16/9",
  };

  return videoUrl ? (
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
  );
};

export type { LibYoutubePlayer };
