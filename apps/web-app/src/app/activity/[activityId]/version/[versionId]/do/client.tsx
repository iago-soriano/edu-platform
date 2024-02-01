"use client";
import { useGetActivityVersionQuery } from "@endpoints";
import { ActivityHeader, StickyHeader, BaseContent } from "./components";
import { Element } from "../common-components";
import { errorToast } from "@components";
import { useEffect, useState } from "react";

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
      <ActivityHeader
        activityId={activityId}
        versionId={versionId}
        saveState={saveState}
      />
      <StickyHeader
        onOpenOptionsMenu={() => {}}
        show={showAuxHeader}
        title={versionQuery.data?.title}
        description={versionQuery.data?.description}
        saveState={saveState}
      />
      <div>
        {versionQuery.data?.elements.map((element) => {
          <ContentComponent
            key={content.id}
            type={content.type}
            activityId={activityId}
            versionId={versionId}
            {...element}
          />;
        })}
      </div>
    </div>
  );
};

export default Page;
