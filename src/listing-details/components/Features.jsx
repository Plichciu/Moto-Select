import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { db } from "./../../../configs";
import {
  Features as FeaturesTable,
  ListingFeatures,
} from "./../../../configs/schema";

import { eq } from "drizzle-orm";

function Features({ listingId }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (listingId) {
      getFeatures();
    }
  }, [listingId]);

  const getFeatures = async () => {
    try {
      const result = await db
        .select({
          id: FeaturesTable.id,
          label: FeaturesTable.label,
        })
        .from(ListingFeatures)
        .innerJoin(
          FeaturesTable,
          eq(ListingFeatures.featureId, FeaturesTable.id),
        )
        .where(eq(ListingFeatures.listingId, Number(listingId)));

      setFeatures(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="my-10 rounded-2xl border bg-white shadow-sm">
      <h2 className="px-6 py-4 text-xl font-semibold border-b">Funkcje</h2>

      <div className="p-6 flex flex-wrap gap-3">
        {features.map((feature) => (
          <span
            key={feature.id}
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-gradient-to-r from-blue-50 to-blue-100
              text-primary text-sm font-medium
              shadow-sm hover:shadow-md transition
            "
          >
            <FaCheck className="text-xs" />

            {feature.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Features;
