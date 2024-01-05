import { getLocaleTimeFromISO } from "@infrastructure";
import { twMerge } from "tailwind-merge";

const Container = ({ children, onClick }) => (
  <fieldset className="border-text2 rounded border transition-all hover:scale-[1.02]">
    <legend>Status</legend>
    <div
      onClick={onClick}
      className="bg-surface4 m-2 cursor-pointer  grid grid-cols-10 p-3 rounded"
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

const Status = ({ children }) => (
  <div className="col-start-8 col-span-1">{children}</div>
);

const Date = ({ children }) => (
  <div className="col-start-9 col-span-2 text-text2 flex items-center break-all">
    Atualizado em {getLocaleTimeFromISO(children)}
  </div>
);

export const DraftActivityCard = ({
  title,
  description,
  status,
  updatedAt,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <TitleAndDescriptionContainer>
        {title ? <Title>{title}</Title> : <EmptyTitle />}
        {description ? (
          <Description>{description}</Description>
        ) : (
          <EmptyDescription />
        )}
      </TitleAndDescriptionContainer>
      {/* <Status>{status}</Status> */}
      <Date>{updatedAt}</Date>
    </Container>
  );
};

export const PublishedActivityCard = ({
  title,
  description,
  status,
  updatedAt,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <TitleAndDescriptionContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleAndDescriptionContainer>

      {/* <Status>{status}</Status> */}
      <Date>{updatedAt}</Date>
    </Container>
  );
};

export const ArchivedActivityCard = ({
  title,
  description,
  status,
  updatedAt,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {/* <Status>{status}</Status> */}
      <Date>{updatedAt}</Date>
    </Container>
  );
};
