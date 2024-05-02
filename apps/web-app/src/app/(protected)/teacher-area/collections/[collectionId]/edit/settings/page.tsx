"use client";
import { useState, useEffect } from "react";
import { useGetCollectionQuery, useUpdateCollectionMutation } from "@endpoints";
import {
  Form,
  Input,
  FormButton,
  Toggle,
  Tooltip,
  Button,
  RadioButton,
  RadioGroup,
  successToast,
} from "@components";

const Page = ({ params: { collectionId: strId } }) => {
  const collectionId = Number(strId);
  const collectionQuery = useGetCollectionQuery({ collectionId });
  const [collection, setCollection] = useState<{
    name: string;
    description: string;
    isPrivate: boolean;
    notifyOwnerOnStudentOutput: boolean;
  }>({
    name: collectionQuery?.data?.name || "",
    description: collectionQuery?.data?.description || "",
    isPrivate: collectionQuery?.data?.isPrivate || false,
    notifyOwnerOnStudentOutput:
      collectionQuery?.data?.notifyOwnerOnStudentOutput || false,
  });

  useEffect(() => {
    if (collectionQuery?.data)
      setCollection({
        name: collectionQuery?.data?.name,
        description: collectionQuery?.data?.description,
        isPrivate: collectionQuery?.data?.isPrivate,
        notifyOwnerOnStudentOutput:
          collectionQuery?.data?.notifyOwnerOnStudentOutput,
      });
  }, [collectionQuery?.data]);

  const saveCollectionMutation = useUpdateCollectionMutation({
    onSuccess: () => {
      successToast("Collection saved successfully!");
    },
  });
  return (
    <div>
      <Form
        className="flex flex-col md:items-start items-center"
        onSubmit={() =>
          saveCollectionMutation.mutate({
            id: collectionId,
            name: collection.name,
            description: collection.description,
            isPrivate: collection.isPrivate,
            notifyOwnerOnStudentOutput: collection.notifyOwnerOnStudentOutput,
          })
        }
      >
        <Input
          name="name"
          placeholder="The name of this collection"
          className="lg:w-[45%] md:w-[60%] w-[95%]"
          value={collection.name}
          inputLabel={{ text: "Name", mandatory: true }}
          onChange={(e) => {
            setCollection((coll) => ({
              ...coll,
              name: (e.target as any).value,
            }));
          }}
        />
        <Input
          name="description"
          placeholder="An optional text that describes this collection"
          className="lg:w-[50%] md:w-[70%] w-[95%]"
          inputLabel={{ text: "Description", mandatory: false }}
          value={collection.description}
          onChange={(e) => {
            setCollection((coll) => ({
              ...coll,
              description: (e.target as any).value,
            }));
          }}
        />
        <label className="m-3">
          <span className="text-lg">Privacy</span>
          <RadioGroup
            value={collection.isPrivate}
            onChange={(v) => {
              const isPrivate = v.target.value === "true";
              setCollection((coll) => ({
                ...coll,
                isPrivate,
                notifyOwnerOnStudentOutput: isPrivate
                  ? coll.notifyOwnerOnStudentOutput
                  : false,
              }));
            }}
            options={[
              {
                text: "Private",
                subText: "Only students you chose can see new activities",
                value: true,
              },
              {
                text: "Public",
                subText: "Collection has followers instead of students",
                value: false,
              },
            ]}
          />
        </label>
        <label className="m-3">
          {collection?.isPrivate && (
            <label className="flex flex-row items-center min-h-11">
              <Toggle
                onChange={(e) =>
                  setCollection((coll) => ({
                    ...coll,
                    notifyOwnerOnStudentOutput: e,
                  }))
                }
                checked={collection?.notifyOwnerOnStudentOutput || false}
              />
              <span className="text-lg p-2">E-mail Notifications</span>
              <span className="text-muted-foreground pr-3">
                Get notified whenever a student finishes an activity
              </span>
            </label>
          )}
        </label>
        <Button size="lg" isLoading={saveCollectionMutation.isPending}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Page;
