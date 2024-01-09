import { getLocaleTimeFromISO } from "@infrastructure";
import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  onClick,
  status,
  cardClasses,
}: {
  children: any;
  onClick: () => any;
  status: string;
  cardClasses?: string;
}) => (
  <fieldset
    onClick={onClick}
    className="border-text2 rounded border transition-all hover:scale-[1.02] cursor-pointer"
  >
    <legend className="px-2">{status}</legend>
    <div
      className={twMerge("grid grid-cols-10 p-3 m-2 bg-surface4", cardClasses)}
    >
      {children}
    </div>
  </fieldset>
);

const TitleAndDescriptionContainer = ({ children }) => (
  <div className="grid grid-rows-2 col-span-8 gap-y-1">{children}</div>
);

const Title = ({ children }) => (
  <h5 className="whitespace-break-spaces">{children}</h5>
);
const EmptyTitle = () => <h6 className="text-text2">Sem título</h6>;

const descriptionClasses = "row-start-2 self-center truncate";
const Description = ({ children }) => (
  <p className={descriptionClasses}>{children}</p>
);
const EmptyDescription = () => (
  <p className={twMerge(descriptionClasses, "text-text2")}>Sem descrição</p>
);

const Date = ({ children }) => (
  <div className="col-start-9 col-span-2 text-text2 justify-self-center self-center lg:flex items-center break-all hidden">
    Atualizado em
    <br />
    {getLocaleTimeFromISO(children)}
  </div>
);

export const DraftActivityCard = ({
  title,
  description,
  updatedAt,
  onClick,
}) => {
  return (
    <Container onClick={onClick} status={"Rascunho"}>
      <TitleAndDescriptionContainer>
        {title ? <Title>{title}</Title> : <EmptyTitle />}
        {description ? (
          <Description>{description}</Description>
        ) : (
          <EmptyDescription />
        )}
      </TitleAndDescriptionContainer>
      <Date>{updatedAt}</Date>
    </Container>
  );
};

export const PublishedActivityCard = ({
  title,
  description,
  updatedAt,
  onClick,
}) => {
  return (
    <Container
      onClick={onClick}
      status={"Publicada"}
      cardClasses="bg-accent bg-opacity-70"
    >
      <TitleAndDescriptionContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleAndDescriptionContainer>
      <Date>{updatedAt}</Date>
    </Container>
  );
};

export const ArchivedActivityCard = ({
  title,
  description,
  updatedAt,
  onClick,
}) => {
  return (
    <Container onClick={onClick} status="Arquivada">
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Date>{updatedAt}</Date>
    </Container>
  );
};
