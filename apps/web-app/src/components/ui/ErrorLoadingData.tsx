// import { Loading, ErrorCard, NoDataCard } from "@components";
import { ReactNode } from "react";
import { Spinner } from "@components/ui/spinner";
import { Text } from "@components/ui/Typography";
import Image from "next/image";

const ErrorCard = ({ message }) => {
  return (
    <div>
      <p className="py-5 text-center">{message}</p>
      <Image
        className="my-auto"
        src={`/assets/images/doodles/messy.svg`}
        width={600}
        height={800}
        alt={"Cartoon of a man dropping his papers"}
      />
    </div>
  );
};

interface ErrorLoadingDataProps {
  error?: { message: string } | null;
  loading?: boolean;
  data: any;
  noData?: ReactNode;
  hasData: boolean;
}

export const LoadingErrorData = ({
  error,
  loading,
  data,
  noData,
  hasData,
}: ErrorLoadingDataProps) => {
  let errorMessage;

  if (error) {
    errorMessage = "There's been an error connecting to the internet!";
    if (error.message !== "Network Error") {
      console.error("query error", error);
      errorMessage = `There's been an error: ${error?.message}`;
    }
  }

  return (
    <div className="flex justify-center">
      {!error && !hasData && !loading && (noData || <Text>No data</Text>)}
      {!error && !loading && hasData && data}
      {error && !loading && !hasData && <h3>{errorMessage}</h3>}
      {loading && <Spinner className=" w-32 h-32" />}
    </div>
  );
};
