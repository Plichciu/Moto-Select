/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_AVTom0CqUG4N@ep-proud-smoke-a90svqn1-pooler.gwc.azure.neon.tech/carM?sslmode=require&channel_binding=require",
  },
};
