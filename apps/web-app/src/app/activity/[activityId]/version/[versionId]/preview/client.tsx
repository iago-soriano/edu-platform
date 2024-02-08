"use client";
import { useGetActivityVersionQuery } from "@endpoints";
import { ActivityHeader } from "./header";
import { useEffect, useState } from "react";
import {
  QuestionContainer,
  StickyHeader,
  BaseContent,
} from "../common-components";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [showAuxHeader, setShowAuxHeader] = useState(false);
  const [saveState, setSaveState] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("activity-header-input");
      if (window.scrollY > el.offsetTop + el.offsetHeight) {
        setShowAuxHeader(true);
      } else {
        setShowAuxHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <ActivityHeader activityId={activityId} versionId={versionId} />
      <StickyHeader
        onOpenOptionsMenu={() => {}}
        show={showAuxHeader}
        title={versionQuery.data?.title}
        description={versionQuery.data?.description}
        saveState={saveState}
      />
      <div>
        {versionQuery.data?.elements.length &&
          versionQuery.data?.elements.map((element) => {
            if (element.content && !element.question) {
              return (
                <div>
                  <BaseContent
                    key={`c-${element.content.id}`}
                    versionId={versionId}
                    activityId={activityId}
                    contentDto={element.content}
                  />
                  <br className="my-5" />
                </div>
              );
            } else if (!element.content && element.question) {
              return <QuestionContainer key={`q-${element.content.id}`} />;
            }
            return <h1>What is this</h1>;
          })}
      </div>
    </div>
  );
};

export default Page;
