import { Heading } from "@components/ui/Typography";
import { z } from "zod";
import { FormTextField } from "@components/ui/Form";
import { DomainRules } from "@edu-platform/common/domain/rules";

export const TitleInputSchema = z
  .string()
  .min(
    DomainRules.TITLE.MIN_LENGTH,
    `Text must have at least ${DomainRules.TITLE.MIN_LENGTH} characters`
  )
  .max(
    DomainRules.TITLE.MAX_LENGTH,
    `Text cannot have more than ${DomainRules.TITLE.MAX_LENGTH} characters`
  );

const TitleContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 mb-10">{children}</div>
);

export const Title = ({ children }) => {
  return (
    <TitleContainer>
      <Heading as="h4" className="sm:text-2xl">
        {children}
      </Heading>
    </TitleContainer>
  );
};

export const TitleInput = () => {
  return (
    <TitleContainer>
      <FormTextField
        id="title-input"
        name="title"
        placeholder="Add your title here..."
        className="w-[80%]"
        inputClassName="sm:text-2xl"
      />
    </TitleContainer>
  );
};
