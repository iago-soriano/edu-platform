import { CheckCheck } from "lucide-react";

export const FeatureItem = ({ featureName, featureDescription }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#c2470a]">
        <CheckCheck size={25} />
      </span>
      <b>
        <p>{featureName}</p>
      </b>
      <p>{featureDescription}</p>
    </div>
  );
};
