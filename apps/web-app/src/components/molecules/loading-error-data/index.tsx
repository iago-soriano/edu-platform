import { Loading, ErrorCard, NoDataCard } from "@components";
import { ReactNode } from "react";

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
    errorMessage = "Houve um erro de conexão com a internet";
    if (error.message !== "Network Error") {
      console.log("query error", error);
      errorMessage = `Houve um erro: ${error?.message}`;
    }
  }

  // console.log({ hasData, error, loading });
  return (
    <div className="p-3 flex justify-center">
      {/* {error && <ErrorCard message={errorMessage} />} */}
      {!error && !hasData && !loading && (noData || <NoDataCard />)}
      {!error && !loading && hasData && data}
      <Loading show={loading} />
    </div>
  );
};
