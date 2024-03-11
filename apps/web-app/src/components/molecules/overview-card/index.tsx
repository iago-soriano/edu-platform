export const OverviewCard = ({ children }) => {
  return (
    <div className="rounded-3xl bg-black bg-opacity-5 p-5 w-fit">
      {children}
    </div>
  );
};

export const OverviewCardHeader = ({ children }) => <h5>{children}</h5>;
export const OverviewCardBody = ({ children }) => <p>{children}</p>;
