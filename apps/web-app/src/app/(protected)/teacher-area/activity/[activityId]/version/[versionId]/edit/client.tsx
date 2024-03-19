"use client";
import { useGetActivityVersionQuery } from "@endpoints";
import { ActivityHeaderInput, BaseContent, OptionsMenu } from "./components";
import { QuestionContainer, StickyHeader } from "@components";
import { useEffect, useState, useRef, useCallback } from "react";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });

  const [saveState, setSaveState] = useState("");
  const [showAuxHeader, setShowAuxHeader] = useState(false);
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

  useEffect(() => {
    const setSticky = () => {
      const el = document.getElementById("activity-header-input");
      if (window.scrollY > (el?.offsetTop || 0) + (el?.offsetHeight || 0)) {
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
    <div ref={scrollRef}>
      <ActivityHeaderInput
        activityId={activityId}
        versionId={versionId}
        saveState={saveState}
        setSaveState={setSaveState}
        onOpenOptionsMenu={() => setOpenOptionsMenu(true)}
      />
      <StickyHeader
        show={showAuxHeader}
        activity={versionQuery?.data}
        saveState={saveState}
        onOpenOptionsMenu={() => setOpenOptionsMenu(true)}
      />
      <div>
        {versionQuery.data?.elements.length ? (
          <>
            {versionQuery.data?.elements.map((element) => {
              if (element.content && !element.question) {
                return (
                  <BaseContent
                    key={`c-${element.content.id}`}
                    versionId={versionId}
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
        versionId={versionId}
        version={versionQuery?.data}
      />
    </div>
  );
};

export default Page;
