import LibYoutubePlayer from "react-player/youtube";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import dynamic from "next/dynamic";
import { useMediaQuery } from "@infrastructure";
import { Spinner } from "@components";

export const YoutubePlayer = ({ player, setPlayer, videoUrl }) => {
  const isMore900 = useMediaQuery("(min-width: 900px)");
  const isMore590 = useMediaQuery("(min-width: 590px)");

  const playerWidth = isMore900 ? 800 : isMore590 ? 501 : 300;
  const playerHeight = isMore900 ? 450 : 282;

  return (
    <div style={{ width: playerWidth, height: playerHeight }}>
      <ReactPlayer
        onReady={(e) => {
          setPlayer(e["player"]);
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
    </div>
  );
};

export type { LibYoutubePlayer };
