import { MongoClient, Db, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";
export let _db: Db;
export const connectDB = async () => {
  if (_db) {
    console.log("Already connected to database");
    return Promise.resolve();
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    console.log("[MongoDB connection] SUCCESS");

    _db = client.db("med-meili-express");
    _db.collection("User").createIndex({ email: 1 }, { unique: true });
    console.log("[Index] Email indexed");
  } catch (e) {
    console.error(`[MongoDB connection] ERROR: ${e}`);
    throw e;
  }
};

export const getDB = () => _db;
