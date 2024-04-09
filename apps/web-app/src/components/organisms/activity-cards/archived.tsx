export const ArchivedGroupActivityCard = ({
  currentTitle,
  archivedCount,
}: {
  currentTitle: string;
  archivedCount: number;
}) => {
  return (
    <OutlinedContainer legend={currentTitle}>
      {archivedCount}
      {/* {versions.map((dto) => (
        <div>{JSON.stringify(dto)}</div>
      ))} */}
    </OutlinedContainer>
  );
};

const OutlinedContainer = ({
  children,
  onClick,
  legend,
}: {
  children: any;
  onClick?: (args: any) => any;
  legend: string;
}) => (
  <fieldset
    onClick={onClick}
    className="border-text2 rounded border transition-all hover:scale-[1.01] cursor-pointer"
  >
    <legend className="px-2">{legend}</legend>
    {children}
  </fieldset>
);
