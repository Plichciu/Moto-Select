import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carLisiting", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  brand: varchar("brand").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  engineSize: varchar("engineSize"),
  horsepower: varchar("horsepower"),
  color: varchar("color").notNull(),
  door: varchar("door").notNull(),
  offerType: varchar("offerType"),
  vin: varchar("vin"),
  location: varchar("location").notNull(),
  description: varchar("description").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(),
  postedOn: varchar("postedOn"),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),
  userImageUrl: varchar("userImageUrl").default(
    "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80",
  ),
});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
  order: integer("order"),
});
