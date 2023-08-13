import { ObjectId } from "mongodb";
import { getDB } from "../../database.js";
import { client } from "../../redis.js";

export async function findUserById(id) {
  const db = getDB();
  const user = db.collection("User");

  return await user.findOne({ _id: new ObjectId(id) });
}

export async function findUserByEmail(email) {
  const db = getDB();
  const user = db.collection("User");
  return await user.findOne({ email });
}

export async function addNewUser(email, password) {
  const db = getDB();
  const user = db.collection("User");

  return await user.insertOne({
    email,
    password,
    createdAt: new Date().getTime(),
  });
}

export async function getUserFromRedis(_id) {
  return await client.get(`user:${_id}`);
}

export async function setUserInRedis(_id, email) {
  return await client.set(`user:${_id}`, email);
}
