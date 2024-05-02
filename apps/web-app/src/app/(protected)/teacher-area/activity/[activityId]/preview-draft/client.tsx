"use client";
import { useGetActivityDraftQuery } from "@endpoints";
import { ActivityHeader } from "./header";
import { useEffect, useState } from "react";
import { QuestionContainer, StickyHeader, BaseContent } from "@components";

const Page = ({ params: { activityId } }) => {
  const versionQuery = useGetActivityDraftQuery({ activityId });
  const [saveState, setSaveState] = useState("");

  return (
    <div>
      <ActivityHeader activityId={activityId} />
      <StickyHeader
        onOpenOptionsMenu={() => {}}
        activity={versionQuery?.data}
        saveState={saveState}
      />
      <div>
        {versionQuery.data?.elements?.length &&
          versionQuery.data?.elements.map((element) => {
            if (element.content && !element.question) {
              return (
                <div>
                  <BaseContent
                    key={`c-${element.content.id}`}
                    contentDto={element.content}
                  />
                  <br className="my-5" />
                </div>
              );
            } else if (!element.content && element.question) {
              return <QuestionContainer key={`q-${element.question.id}`} />;
            }
            return <h1>What is this</h1>;
          })}
      </div>
    </div>
  );
};

export default Page;
