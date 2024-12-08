import { CheckCheck } from "lucide-react";

export const FeatureItem = ({ featureName, featureDescription }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3">
      <span className="text-primary">
        <CheckCheck size={25} />
      </span>
      <p>
        <b>{featureName}</b> {featureDescription}
      </p>
    </div>
  );
};
