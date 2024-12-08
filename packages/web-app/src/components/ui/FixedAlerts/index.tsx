export const PendingBanner = ({ children }) => (
  <div className="mb-4 p-2 rounded-sm border-yellow-300 border-2 bg-yellow-300/30 w-fit font-light">
    {children}
  </div>
);

export const SuccessBanner = ({ children }) => (
  <div className="mb-4 p-2 rounded-sm border-green-400 border-2 bg-green-400/30 w-fit font-light">
    {children}
  </div>
);

export const ErrorBanner = ({ children }) => (
  <div className="mb-4 p-2 rounded-sm border-rose-500 border-2 bg-rose-500/30 w-fit font-light">
    {children}
  </div>
);
