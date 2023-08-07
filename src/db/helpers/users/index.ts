import { ObjectId } from "mongodb";
import { getDB } from "../../database";

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
  });
}
