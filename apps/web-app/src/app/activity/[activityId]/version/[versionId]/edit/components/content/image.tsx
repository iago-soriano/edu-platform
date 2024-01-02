import { ImageInput } from "@components";
import { useState } from "react";

export const ImageContent = ({
  url,
  saveContentMutation,
  onChange,
  hasChanges,
  contentId,
}) => {
  const [selectedImg, setSelectedImg] = useState<File>();
  const onFileUpload = async () => {
    console.log(selectedImg);
    const formData = new FormData();
    formData.append("image", selectedImg);
    formData.append("title", "Novoaaaaaaaaaaaa");
    formData.append("type", "Image");
    formData.append("description", "tentando mudar esse trem de novo");
    formData.append("contentId", "14");

    // mutation.mutate({
    //   title: "Novo título",
    //   description: "Nova desc",
    //   type: "Audio",
    //   image: formData,
    // });
    saveContentMutation.mutate(formData);
  };
  //   const onSaveContent = (e) => {
  //     if (hasChanges) {
  //       saveContentMutation.mutate({
  //         content: e.target.value,
  //         type: "Text",
  //         contentId,
  //       });
  //     }
  //     onChange(false);
  //   };
  return (
    <div>
      <ImageInput onChange={setSelectedImg} onSubmit={onFileUpload} />
      <button type="submit" onClick={onFileUpload}>
        Enviar
      </button>
    </div>
  );
};
