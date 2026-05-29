import {
  integer,
  numeric,
  json,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
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
  userId: integer("user_id").references(() => Users.id),
});



export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
  order: integer("order"),
});

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),

  clerkUserId: varchar("clerk_user_id").notNull().unique(),

  username: varchar("username").notNull(),

  email: varchar("email").notNull(),

  imageUrl: varchar("image_url"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const Features = pgTable("features", {
  id: serial("id").primaryKey(),

  name: varchar("name").notNull(),

  label: varchar("label").notNull(),
});

export const ListingFeatures = pgTable("listing_features", {
  id: serial("id").primaryKey(),

  listingId: integer("listing_id")
    .notNull()
    .references(() => CarListing.id),

  featureId: integer("feature_id")
    .notNull()
    .references(() => Features.id),
});
