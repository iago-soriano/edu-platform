import { getLocaleTimeFromISO } from "@infrastructure";

const Container = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="bg-surface4 cursor-pointer transition-all hover:scale-[1.02] grid grid-cols-10 p-3 rounded"
  >
    {children}
  </div>
);

const Title = ({ children }) => (
  <h4 className="col-start-1 col-span-3">{children}</h4>
);
const EmptyTitle = () => (
  <h4 className="text-text2 col-start-1 col-span-3">Sem título</h4>
);

const Description = ({ children }) => (
  <p className="col-start-4 col-span-4">{children}</p>
);
const EmptyDescription = () => (
  <p className="col-start-4 col-span-4 text-text2">Sem descrição</p>
);

const Status = ({ children }) => (
  <div className="col-start-8 col-span-1">{children}</div>
);

const Date = ({ children }) => (
  <div className="col-start-9 col-span-2 text-text2">
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
      <div></div>
      {title ? <Title>{title}</Title> : <EmptyTitle />}
      {description ? (
        <Description>{description}</Description>
      ) : (
        <EmptyDescription />
      )}
      <Status>{status}</Status>
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
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Status>{status}</Status>
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
      <Status>{status}</Status>
      <Date>{updatedAt}</Date>
    </Container>
  );
};
