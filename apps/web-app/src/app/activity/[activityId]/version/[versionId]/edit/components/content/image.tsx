import { useState } from "react";
import Image from "next/image";
import { SaveContentMutationType } from "@infrastructure";
import { SaveContentRequestBody } from "@edu-platform/common";

export const ImageContent = ({
  url,
  saveContentMutation,
  contentId,
  title,
  description,
}: {
  saveContentMutation: SaveContentMutationType;
  url: string;
  contentId: string;
  title: string;
  description: string;
}) => {
  const [selectedImg, setSelectedImg] = useState<File>();
  const onFileUpload = async (e) => {
    setSelectedImg(e.target.files[0]);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    formData.append("contentId", contentId);
    formData.append("type", "Image");
    title && formData.append("title", title);
    description && formData.append("description", description);

    saveContentMutation.mutate(formData as unknown as SaveContentRequestBody);
  };

  return (
    <div>
      <input
        type="file"
        onChange={onFileUpload}
        accept="image/png, image/jpeg"
      />
      <div className="w-[550px] h-[550px] flex justify-center items-center mx-auto my-3">
        {selectedImg || url ? (
          <img
            src={(selectedImg && URL.createObjectURL(selectedImg)) || url}
            alt="Imagem escolhida"
            className="max-w-[550px] max-h-[550px]"
          />
        ) : (
          <p>Insira uma imagem e ela aparecerá aqui</p>
        )}
      </div>
    </div>
  );
};
