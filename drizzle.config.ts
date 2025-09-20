import { defineConfig } from "drizzle-kit";

// Drizzle migration/generator configuration.
// Note: This config requires a source schema file (e.g. ./shared/schema.ts).
// The current repository includes the compiled schema only (in dist), so
// running drizzle-kit will require adding the schema source back to the repo.

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // drizzle-kit reads DATABASE_URL at runtime; ensure it's set before running commands like `drizzle-kit push`
    url: process.env.DATABASE_URL!,
  },
});
