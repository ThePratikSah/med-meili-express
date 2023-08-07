import { ObjectId } from "mongodb";
import { getDB } from "../../database";
import { client } from "../../redis";

export async function findUserById(id: string) {
  const db = getDB();
  const user = db.collection("User");

  return await user.findOne({ _id: new ObjectId(id) });
}

export async function findUserByEmail(email: string) {
  const db = getDB();
  const user = db.collection("User");

  return await user.findOne({ email });
}

export async function addNewUser(email: string, password: string) {
  const db = getDB();
  const user = db.collection("User");

  return await user.insertOne({
    email,
    password,
    createdAt: new Date().getTime(),
  });
}

export async function getUserFromRedis(_id: string) {
  return await client.get(`user:${_id}`);
}

export async function setUserInRedis(_id: string, email: string) {
  return await client.set(`user:${_id}`, email);
}
