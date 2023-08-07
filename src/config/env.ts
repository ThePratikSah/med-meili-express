export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017",
  DATABASE: process.env.DATABASE || "med-meili-express",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "some_random_key",
};
