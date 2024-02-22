import { useState } from "react";
import { ImageContentPayloadDTO, ContentTypes } from "@edu-platform/common";
import { CommmonContentProps } from "./types";

export const ImageContent = ({
  payload: { url },
  saveContentMutation,
  contentId,
}: { payload: ImageContentPayloadDTO } & CommmonContentProps) => {
  const [selectedImg, setSelectedImg] = useState<File>();
  const onFileUpload = async (e) => {
    setSelectedImg(e.target.files[0]);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    formData.append("id", contentId.toString());
    formData.append("type", ContentTypes.Image);

    saveContentMutation.mutate(formData as unknown);
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
