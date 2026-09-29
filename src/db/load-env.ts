// Loads env files for scripts that run outside Next.js (drizzle-kit, seeding).
// Import this before `@/db`, which reads DATABASE_URL at import time.
import { config } from "dotenv";

// Earlier files win: .env.local overrides .env, matching Next.js.
config({ path: [".env.local", ".env"], quiet: true });
