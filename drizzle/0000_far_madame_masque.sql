CREATE TABLE IF NOT EXISTS "carImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"carListingId" integer NOT NULL,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carLisiting" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"tagline" varchar,
	"originalPrice" varchar,
	"sellingPrice" varchar NOT NULL,
	"category" varchar NOT NULL,
	"condition" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"model" varchar NOT NULL,
	"year" varchar NOT NULL,
	"driveType" varchar NOT NULL,
	"transmission" varchar NOT NULL,
	"fuelType" varchar NOT NULL,
	"mileage" varchar NOT NULL,
	"engineSize" varchar,
	"horsepower" varchar,
	"color" varchar NOT NULL,
	"door" varchar NOT NULL,
	"offerType" varchar,
	"vin" varchar,
	"location" varchar NOT NULL,
	"description" varchar NOT NULL,
	"features" json,
	"createdBy" varchar NOT NULL,
	"postedOn" varchar,
	"latitude" varchar,
	"longitude" varchar,
	"userImageUrl" varchar DEFAULT 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80',
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image_url" varchar,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carImages" ADD CONSTRAINT "carImages_carListingId_carLisiting_id_fk" FOREIGN KEY ("carListingId") REFERENCES "public"."carLisiting"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carLisiting" ADD CONSTRAINT "carLisiting_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
