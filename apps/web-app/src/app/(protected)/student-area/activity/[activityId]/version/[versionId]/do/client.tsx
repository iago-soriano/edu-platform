"use client";
import { useGetActivityVersionQuery } from "@endpoints";
import { useEffect, useState } from "react";
import {
  QuestionContainer,
  StickyHeader,
  BaseContent,
  ActivityHeader,
} from "@components";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [showAuxHeader, setShowAuxHeader] = useState(false);
  const [saveState, setSaveState] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("activity-header-input");
      if (window.scrollY > (el?.offsetTop || 0) + (el?.offsetHeight || 0)) {
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
        activity={versionQuery}
        saveState={saveState}
      />
      <div>
        {versionQuery.data?.elements.length &&
          versionQuery.data?.elements.map((element) => {
            if (element.content && !element.question) {
              return (
                <BaseContent
                  key={`c-${element.content.id}`}
                  versionId={versionId}
                  activityId={activityId}
                  contentDto={element.content}
                />
              );
            } else if (!element.content && element.question) {
              return (
                <QuestionContainer key={`q-${element?.content?.id || 0}`} />
              );
            }
            return <h1>What is this</h1>;
          })}
      </div>
    </div>
  );
};

export default Page;
