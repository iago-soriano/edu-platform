"use client";
import { Footer, ImageInput } from "@components";

export default () => {
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
      <Footer />
    </>
  );
};
