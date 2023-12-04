"use client";
import {
  useGetActivityVersionQuery,
  useUpdateVersionMetadataMutation,
} from "@infrastructure";
import {
  Form,
  GhostInput,
  GhostTextArea,
  errorToast,
  Spinner,
  Icons,
  Tooltip,
} from "@components";
import { useState } from "react";

const Page = ({ params: { activityId, versionId } }) => {
  const versionQuery = useGetActivityVersionQuery({ activityId, versionId });

  const metadataMutation = useUpdateVersionMetadataMutation({
    activityId,
    versionId,
    onError: () => {
      errorToast("Houve um erro ao salvar :(");
    },
  });

  const onChangeTitle = (args) => {
    if (
      args.target.value &&
      args.target.value != metadataMutation.variables?.title
    )
      metadataMutation.mutate({ title: args.target.value, activityId });
  };

  const onChangeDescription = (args) => {
    if (
      args.target.value &&
      args.target.value != metadataMutation.variables?.description
    )
      metadataMutation.mutate({ description: args.target.value, activityId });
  };
  // console.log(versionQuery);
  // console.log(versionQuery.data);

  return (
    <div className="grid sm:grid-cols-10 grid-cols-16 bg-surface3 p-2">
      <div className="lg:col-start-3 lg:col-span-5 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
        <GhostInput
          name="title"
          placeholder="Título da atividade"
          className="text-3xl leading-10 font-bold"
          defaultValue={versionQuery.data?.title}
          disabled={!versionQuery.data}
          onBlur={onChangeTitle}
          error={metadataMutation.error?.message}
        />
        <br />
        <GhostTextArea
          name="description"
          placeholder="Descrição da atividade"
          className="text-xl text-text2"
          defaultValue={versionQuery.data?.description}
          disabled={!versionQuery.data}
          onBlur={onChangeDescription}
          error={metadataMutation.error?.message}
        />
      </div>
      <div className="lg:col-start-10 col-start-16 col-span-1 flex flex-row justify-end items-start">
        <div className="h-7 w-7 m-1">
          {metadataMutation.isPending ? (
            <Tooltip content={"Salvando..."}>
              <Spinner />
            </Tooltip>
          ) : (
            <Tooltip content={"Atividade salva"}>
              <Icons.CHECK size={28} />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
