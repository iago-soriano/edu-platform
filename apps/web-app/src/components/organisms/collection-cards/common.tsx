export const Name = ({ children }) => <h5 className="truncate">{children}</h5>;
export const Description = ({ children }) => (
  <p className="row-start-2 self-center truncate">{children}</p>
);
export const MainContainer = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...rest}
    className="grid grid-rows-3 p-3 m-2 bg-surface1 border-accent/70 border-2 bg-opacity-70 w-full rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit"
  >
    {children}
  </div>
);
export const EmptyDescription = () => (
  <p className="row-start-2 self-center truncate text-text2">Sem descrição</p>
);
