import { useState } from "react";
import Image from "next/image";
import { SaveContentMutationType } from "@infrastructure";
import { SaveContentRequestBody } from "@edu-platform/common";

export const ImageContent = ({
  url,
  saveContentMutation,
  contentId,
}: {
  saveContentMutation: SaveContentMutationType;
  url: string;
  contentId: string;
}) => {
  const [selectedImg, setSelectedImg] = useState<File>();
  const onFileUpload = async () => {
    console.log(selectedImg);
    const formData = new FormData();
    formData.append("image", selectedImg);
    formData.append("contentId", contentId);
    formData.append("type", "Image");

    // mutation.mutate({
    //   title: "Novo título",
    //   description: "Nova desc",
    //   type: "Audio",
    //   image: formData,
    // });
    saveContentMutation.mutate(formData as unknown as SaveContentRequestBody);
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => setSelectedImg(e.target.files[0])}
        accept="image/png, image/jpeg"
        onSubmit={onFileUpload}
      />
      <img
        src={(selectedImg && URL.createObjectURL(selectedImg)) || url}
        alt="Imagem escolhida"
      />
      <button type="submit" onClick={onFileUpload}>
        Enviar
      </button>
    </div>
  );
};
