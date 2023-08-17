import { MongoClient } from "mongodb";
import { env } from "../config/env.js";
import { collections } from "./collections.js";

const uri = env.DATABASE_URL;
export let _db;
export const connectDB = async () => {
  if (_db) {
    console.log("Already connected to database");
    return Promise.resolve();
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();

    console.log("[MongoDB] Connection success");

    _db = client.db(env.DATABASE);
    _db
      .collection(collections.user)
      .createIndex({ email: 1 }, { unique: true });
    console.log("[Index] Email indexed");
  } catch (e) {
    console.error(`[MongoDB] Connection error: ${e}`);
    throw e;
  }
};

export const getDB = () => _db;
