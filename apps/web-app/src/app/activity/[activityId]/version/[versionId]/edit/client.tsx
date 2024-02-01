"use client";
import { useGetActivityVersionQuery } from "@endpoints";
import {
  ActivityHeaderInput,
  BaseContent,
  StickyHeader,
  OptionsMenu,
} from "./components";
import { Element, QuestionContainer } from "../common-components";
import { useEffect, useState, useRef, useCallback } from "react";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });

  const [saveState, setSaveState] = useState("");
  const [showAuxHeader, setShowAuxHeader] = useState(false);
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);

  const scrollRef = useRef<HTMLDivElement>();

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
        title={versionQuery.data?.title}
        description={versionQuery.data?.description}
        saveState={saveState}
        onOpenOptionsMenu={() => setOpenOptionsMenu(true)}
      />
      <div>
        {versionQuery.data?.elements.length ? (
          <>
            {versionQuery.data?.elements.map((element) => (
              <Element
                element={element}
                QuestionComponent={() => <QuestionContainer />}
                ContentComponent={() => (
                  <BaseContent
                    versionId={versionId}
                    activityId={activityId}
                    setSaveState={setSaveState}
                    contentDto={element.content}
                  />
                )}
              />
            ))}
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
        version={versionQuery}
      />
    </div>
  );
};

export default Page;
