import { Text } from "@components/ui/Typography";
import { FormTextAreaField } from "@components/ui/Form";

type WithReviewProps = {
  role: "student" | "reviewer";
  index: number;
  review?: string;
  renderQuestion: () => React.ReactNode;
};

export const WithReview = ({
  role,
  index,
  renderQuestion,
  review,
}: WithReviewProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="w-full lg:w-[50%]">{renderQuestion()}</div>
      <div className="flex flex-col gap-y-2 mt-4 p-4 w-full lg:w-[50%]">
        {role === "reviewer" ? (
          <>
            <Text className="font-semibold">
              Provide some feedback on the answer (optional)
            </Text>
            <FormTextAreaField
              name={`base.${index}.review`}
              isHeightSelfAdjusting
              textAreaClassName="resize-none overflow-y-hidden leading-relaxed"
              defaultValue={review}
            />
          </>
        ) : (
          <Text className="text-center font-light">
            {review || "No review has been given to this answer yet"}
          </Text>
        )}
      </div>
    </div>
  );
};
