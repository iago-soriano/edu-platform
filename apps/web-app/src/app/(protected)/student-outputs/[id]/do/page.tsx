import { Client } from "@edu-platform/common/api";
import { Fetcher } from "@infrastructure";
import { Title } from "@components/ActivityBlocks/title";
import { StudentOutputDoForm } from "@components/StudentOutputDoForm";
import { authOptions } from "../../../../api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { ErrorBanner } from "@components/ui/FixedAlerts";

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

  if (session?.user.email !== stdOutput.studentEmail)
    return (
      <ErrorBanner>
        It does't look like this activity was made for you!
      </ErrorBanner>
    );

  return (
    <div className="w-[90%] md:w-[75ch] lg:w-[100ch] p-3 mx-auto">
      <Title>{stdOutput.title}</Title>
      <StudentOutputDoForm studentOutput={stdOutput} />
    </div>
  );
};
export default Page;
