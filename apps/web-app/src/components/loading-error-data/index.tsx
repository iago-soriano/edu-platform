import { Spinner, ErrorCard } from "@components";
import { ReactNode } from "react";

interface ErrorLoadingDataProps {
  error?: { message: string };
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
  if (error) {
    let errorMessage = "Houve um erro de conexão com a internet";
    if (error.message !== "Network Error") {
      console.log("query error", error);
      errorMessage = `Houve um erro: ${error?.message}`;
    }

    return (
      <div className="p-3 flex justify-center">
        <ErrorCard message={errorMessage} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[150px] my-10">
        <Spinner />
      </div>
    );
  }

  console.log(data);
  if (!hasData)
    return noData || <h5 className="text-center">Não há dados disponíveis</h5>;
  return data;
};
