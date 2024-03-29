import { Icons } from "../icons";
import { twMerge } from "tailwind-merge";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[35%] [&>span]:mx-2";
export const RemoveButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, "text-accent")}>
    <Icons.TRASH size={20} /> <span>Remover</span>
  </button>
);
export const PublishButton = ({ disabled, ...rest }) => {
  const getContent = () => (
    <>
      <Icons.PUBLISH size={25} /> <span>Publicar</span>
    </>
  );
  if (disabled)
    return (
      <>
        <button
          {...rest}
          className={twMerge(
            footerButtonsClasses,
            "bg-accent text-white",
            "cursor-not-allowed bg-opacity-60 border-none"
          )}
        >
          {getContent()}
        </button>
        Não se pode publicar uma atividade sem conteúdos ou perguntas
      </>
    );
  return (
    <button
      {...rest}
      className={twMerge(footerButtonsClasses, "bg-accent text-white")}
    >
      {getContent()}
    </button>
  );
};
