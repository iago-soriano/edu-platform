"use client";
import { useState, useEffect } from "react";
import {
  useSaveCollectionMutation,
  useGetCollectionQuery,
  useCreateNewActivityMutation,
} from "@endpoints";
import { Form, Input, FormButton, Toggle } from "@components";

const Page = ({ params: { collectionId: strId } }) => {
  const collectionId = Number(strId);
  const collectionQuery = useGetCollectionQuery({ collectionId });
  const [collection, setCollection] = useState<{
    name: string;
    description: string;
    isPrivate: boolean;
    notifyOwnerOnStudentOutput: boolean;
  }>({
    name: "",
    description: "",
    isPrivate: false,
    notifyOwnerOnStudentOutput: false,
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

  const saveCollectionMutation = useSaveCollectionMutation({});

  return (
    <div>
      <Form
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
          className=""
          value={collection.name}
          inputLabel={{ text: "Name", mandatory: true }}
        />
        <Input
          name="description"
          placeholder="An optional text that describes this collection"
          className="w-[50%]"
          inputLabel={{ text: "Description", mandatory: false }}
          value={collection.description}
        />
        <Toggle
          label="Coleção privada"
          onChange={(e) => setCollection((coll) => ({ ...coll, isPrivate: e }))}
          checked={collectionQuery?.data?.isPrivate || false}
        />
        <Toggle
          label="Notificações por e-mail"
          onChange={(e) =>
            setCollection((coll) => ({
              ...coll,
              notifyOwnerOnStudentOutput: e,
            }))
          }
          checked={collectionQuery?.data?.notifyOwnerOnStudentOutput || false}
        />
        <FormButton
          label="Enviar"
          loading={saveCollectionMutation.isPending}
          disabled={saveCollectionMutation.isSuccess}
        />
      </Form>
    </div>
  );
};

export default Page;
