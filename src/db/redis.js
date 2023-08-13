import { createClient } from "redis";

export const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

export async function redisConnect() {
  await client.connect();
  console.log("[REDIS] Connection success");
}

export async function redisDisconnect() {
  await client.disconnect();
}
