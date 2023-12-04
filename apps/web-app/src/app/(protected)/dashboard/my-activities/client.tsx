"use client";
import { Spinner } from "@components";
import { useGetActivitiesQuery, axios } from "@infrastructure";

export default function Activities() {
  const { data } = useGetActivitiesQuery();

  return (
    data?.map((act, i) => <div key={i}>{JSON.stringify(act)}</div>) || (
      <Spinner />
    )
  );
}
