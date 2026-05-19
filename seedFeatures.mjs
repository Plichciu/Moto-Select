import fs from "fs";

import { db } from "./configs/index.js";
import { Features } from "./configs/schema.js";

const rawData = fs.readFileSync(
  "./src/Shared/features.json",
  "utf-8"
);

const features = JSON.parse(rawData);

const seedFeatures = async () => {
  try {
    for (const feature of features.features) {
      await db.insert(Features).values({
        name: feature.name,
        label: feature.label,
      });
    }

    console.log("Features added");
  } catch (error) {
    console.log(error);
  }
};

seedFeatures();