import { Text } from "@components/ui/Typography";
import { cx } from "@styles/utils";

export const TextContainer = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("flex flex-col gap-y-2", className)}>{children}</div>
);

export const TextInstruction = () => (
  <Text className="font-semibold">
    Read the text and then answer the questions
  </Text>
);
