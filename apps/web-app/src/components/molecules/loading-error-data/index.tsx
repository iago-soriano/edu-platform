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

  return (
    <div className="flex justify-center">
      {!error && !hasData && !loading && (noData || <NoDataCard />)}
      {!error && !loading && hasData && data}
      {error && !loading && !hasData && <h3>{errorMessage}</h3>}
      <Loading show={loading} />
    </div>
  );
};
