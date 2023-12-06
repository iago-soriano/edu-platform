"use client";
import { Footer, ImageInput } from "@components";
import { useState } from "react";

import { useSaveContentMutation } from "@infrastructure";

export default () => {
  const mutation = useSaveContentMutation({ activityId: "7", versionId: "7" });
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
    mutation.mutate(formData);
  };
  return (
    <>
      <section className="min-h-[70vh] bg-surface2">
        <div className="grid grid-cols-2">
          <div>
            <div className="w-40 h-40 bg-surface1 text-text1">S1 T1</div>
            <div className="w-40 h-40 bg-surface2 text-text1">S2 T1</div>
            <div className="w-40 h-40 bg-surface3 text-text1">S3 T1</div>
            <div className="w-40 h-40 bg-surface4 text-text1">S4 T1</div>
          </div>
          <div>
            <div className="w-40 h-40 bg-surface1 text-text2">S1 T2</div>
            <div className="w-40 h-40 bg-surface2 text-text2">S2 T2</div>
            <div className="w-40 h-40 bg-surface3 text-text2">S3 T2</div>
            <div className="w-40 h-40 bg-surface4 text-text2">S4 T2</div>
          </div>
          <div className="w-40 h-10 bg-accent" />
        </div>
      </section>
      <section>
        <ImageInput onChange={setSelectedImg} onSubmit={onFileUpload} />
        <button type="submit" onClick={onFileUpload}>
          Enviar
        </button>

        {/* <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept="image/png, image/jpeg"
        /> */}
      </section>
      <Footer />
    </>
  );
};
