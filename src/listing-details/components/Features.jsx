import { featureLabelMap } from "@/Shared/Service";
import React from "react";
import { FaCheck } from "react-icons/fa6";


function Features({ features }) {
  if (!features) return null;

  return (
    <div className="my-10 rounded-2xl border bg-white shadow-sm">
      <h2 className="px-6 py-4 text-xl font-semibold border-b">Features</h2>

      <div className="p-6 flex flex-wrap gap-3">
        {Object.entries(features)
          .filter(([, value]) => value)
          .map(([feature], index) => (
            <span
              key={index}
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-gradient-to-r from-blue-50 to-blue-100
                text-primary text-sm font-medium
                shadow-sm hover:shadow-md transition
              "
            >
              <FaCheck className="text-xs" />
              {featureLabelMap[feature] || feature}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Features;
