import { Text } from "@components/ui/Typography";
import { TextContainer, TextInstruction } from "./common";

export const TextBlock = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <TextContainer className={className}>
      <TextInstruction />
      <Text className="leading-relaxed">{children}</Text>
    </TextContainer>
  );
};
