"use client";
import { useGetActivityDraftQuery } from "@endpoints";
import { ActivityHeaderInput, BaseContent, OptionsMenu } from "./components";
import { QuestionContainer, StickyHeader } from "@components";
import { useEffect, useState, useRef, useCallback } from "react";

const Page = ({ params: { activityId } }) => {
  const versionQuery = useGetActivityDraftQuery({ activityId });

  const [saveState, setSaveState] = useState<"hasChanges" | "ready" | "error">(
    "ready"
  );
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // TODO: make this work
  // const scrollToBottom = useCallback(() => {
  //   if (!scrollRef.current) return;
  //   scrollRef.current.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: "smooth",
  //   });
  // }, [scrollRef, document.body.scrollHeight]);

  return (
    <div ref={scrollRef}>
      <ActivityHeaderInput
        activityId={activityId}
        saveState={saveState}
        setSaveState={setSaveState}
        onOpenOptionsMenu={() => setOpenOptionsMenu(true)}
      />
      <StickyHeader
        activity={versionQuery?.data}
        saveState={saveState}
        onOpenOptionsMenu={() => setOpenOptionsMenu(true)}
      />
      <div>
        {versionQuery.data?.elements?.length ? (
          <>
            {versionQuery.data?.elements.map((element) => {
              if (element.content && !element.question) {
                return (
                  <BaseContent
                    key={`c-${element.content.id}`}
                    activityId={activityId}
                    setSaveState={setSaveState}
                    contentDto={element.content}
                  />
                );
              } else if (!element.content && element.question) {
                return <QuestionContainer key={`q-${element?.question?.id}`} />;
              }
              return <h1>What is this</h1>;
            })}
          </>
        ) : (
          <h5 className="text-center">
            Insira conteúdos para criar uma atividade!
          </h5>
        )}
      </div>
      <br />
      <OptionsMenu
        isOpen={openOptionsMenu}
        // scrollToBottom={scrollToBottom}
        onClose={() => {
          setOpenOptionsMenu(false);
        }}
        activityId={activityId}
      />
    </div>
  );
};

export default Page;
