import { Client } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";
import { Title } from "@components/ActivityBlocks/title";
import { StudentOutputReviewForm } from "@components/StudentOutputReviewForm";
import { authOptions } from "../../../../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { PendingBanner, SuccessBanner } from "@components/ui/FixedAlerts";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const client = new Client(new Fetcher());
  const stdOutput = await client.getStudentOutputById({
    studentOutputId: params.id,
  });

  const session = await getServerSession(authOptions);

  let role: "student" | "reviewer" = "student";
  if (session?.user.email === stdOutput.reviewerEmail) role = "reviewer";

  const isAnswered = stdOutput.answers.every(({ answer }) => answer.length);
  const isReviwed = stdOutput.answers.every(({ review }) => review.length);

  if (role === "student" && !isAnswered)
    redirect(`/student-outputs/${params.id}/do`);

  return (
    <div className="w-[90%] md:w-[75ch] lg:w-[70%] p-3 mx-auto">
      {role === "reviewer" && !isAnswered && (
        <PendingBanner>
          This activity has not been answered yet. Check back soon!
        </PendingBanner>
      )}

      {role === "student" && !isReviwed && (
        <PendingBanner>
          This activity has not been reviewed yet. Check back soon!
        </PendingBanner>
      )}

      {role === "reviewer" && isAnswered && (
        <SuccessBanner>This activity has been answered!</SuccessBanner>
      )}
      {role === "student" && isReviwed && (
        <SuccessBanner>This activity has been reviewed!</SuccessBanner>
      )}

      <Title>{stdOutput.title}</Title>
      <StudentOutputReviewForm
        studentOutput={stdOutput}
        role={role}
        isAnswered={isAnswered}
        isReviewed={isReviwed}
      />
    </div>
  );
};
export default Page;
