"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/Accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { MessageCircleQuestion } from "lucide-react";

export const FAQQuestion = ({ question, answer }) => {
  return (
    /*     <div className="flex items-center gap-3">
      <span className="text-[#c2470a]">
        <MessageCircleQuestion size={25} />
      </span>
      <b>
        <p>{question}</p>
      </b>
    </div> */
    <Accordion type="single" collapsible>
      <AccordionItem value="question">
        <AccordionTrigger className="flex justify-start items-center gap-4">
          {" "}
          {question}
          <MessageCircleQuestion size={25} className="text-[#c2470a]" />
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden transition-all duration-300 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <p className="ml-3 my-4">{answer}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
