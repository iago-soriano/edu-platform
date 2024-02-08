export const ImageView = ({ src }) => (
  <div
    className={`w-[550px] h-[550px] flex justify-center items-center mx-auto my-3`}
  >
    <img src={src} className="max-w-[550px] max-h-[550px]" />
  </div>
);
