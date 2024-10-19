import { Text } from "@components/ui/Typography";
import { cx, hasErrorInput } from "@styles/utils";

export const MultipleChoiceQuestionInstruction = () => (
  <Text className="font-semibold">Choose the correct alternative</Text>
);

export const MultipleChoiceAlternativeContainer = ({ children }) => (
  <div className="flex flex-row gap-x-2 ml-2">{children}</div>
);

export const MultipleChoiceAlternativesGroupContainer = ({ children }) => (
  <div className="flex flex-col gap-y-2 ">{children}</div>
);

type ContainerProps = {
  error?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const MultipleChoiceQuestionContainer = ({
  children,
  error,
  className,
}: ContainerProps) => (
  <div
    className={cx(
      "flex flex-col gap-y-2 mt-4 p-4",
      !!error ? hasErrorInput : "",
      className
    )}
  >
    {children}
    <Text className="text-sm font-medium text-destructive">{error ?? ""}</Text>
  </div>
);
