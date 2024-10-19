import { Text } from "@components/ui/Typography";
import { cx } from "@styles/utils";

export const OpenQuestionContainer = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("flex flex-col gap-y-2 mt-4 p-4", className)}>
    {children}
  </div>
);

export const OpenQuestionInstruction = () => (
  <Text className="font-semibold">
    Answer the following question in your own words
  </Text>
);
