import dotenv from "dotenv";
import path from "path";

// ✅ Manually load .env even if OneDrive blocks automatic loading
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  engine: "classic",
  migrations: {
    path: "prisma/migrations",
  },
};
