"use client";
import { useGetActivityVersionQuery } from "@infrastructure";
import {
  ActivityHeaderInput,
  InsertButtons,
  BaseContent,
  StickyHeader,
} from "./components";
import { useEffect, useState } from "react";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });
  const [saveState, setSaveState] = useState("");
  const [showAuxHeader, setShowAuxHeader] = useState(false);

  useEffect(() => {
    const setSticky = () => {
      const el = document.getElementById("activity-header-input");
      if (window.scrollY > el.offsetTop + el.offsetHeight) {
        setShowAuxHeader(true);
      } else {
        setShowAuxHeader(false);
      }
    };
    const handleScroll = setSticky;
    setSticky();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <ActivityHeaderInput
        activityId={activityId}
        versionId={versionId}
        saveState={saveState}
        setSaveState={setSaveState}
      />
      <StickyHeader
        show={showAuxHeader}
        title={versionQuery.data?.title}
        description={versionQuery.data?.description}
        saveState={saveState}
      />
      <div>
        {versionQuery.data?.elements.map((element) => (
          <BaseContent
            key={element.id}
            type={element.type}
            activityId={activityId}
            versionId={versionId}
            setSaveState={setSaveState}
            {...element}
          />
        ))}
      </div>
      <div className="">
        <InsertButtons order={versionQuery.data?.elements?.length} />
      </div>
    </div>
  );
};

export default Page;